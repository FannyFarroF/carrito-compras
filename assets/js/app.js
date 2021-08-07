const productos = document.querySelector('.products');
let productosCarrito = [];

cargarEventListener();

function cargarEventListener() {
    productos.addEventListener('click', agregarProducto)
}

function agregarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {

        let seleccionado = e.target.parentElement.parentElement.parentElement;

        obtenerInfoProducto(seleccionado);

    }

}

function obtenerInfoProducto(prod) {
    // Obtienes la información de producto seleccionado
    const info = {
        id: prod.querySelector('a.agregar-carrito').getAttribute('data-id'),
        title: prod.querySelector('a.title').innerText,
        precio: prod.querySelector('span.price-dscto').innerText,
        cantidad: parseInt(prod.querySelector('input').value),
    }

    // Guardar el producto seleccionado

    // (1) Evaluar que no se haya seleccionado anteriormente
    let existe = productosCarrito.some(item => item.id == info.id);


    if (!existe) {
        productosCarrito.push(info)
        console.log("PRODUCTOS:", productosCarrito)
            // crearHTML();
    } else {
        // Si ya ha sido agregado el producto => actualiza la cantidad

        // console.log("MSJ: 'YA EXISTE'")
        let cursoActualizar = parseInt(info.id);

        productosCarrito.forEach(item => {

            if (item.id == cursoActualizar) {
                item.cantidad = info.cantidad
                    // crearHTML();
            }

        });
        console.log("PRODUCTOS:", productosCarrito)

    }

}