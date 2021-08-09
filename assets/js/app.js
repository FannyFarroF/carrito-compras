const productos = document.querySelector('.products');
const contentModal = document.querySelector('.modal .modal-body');
const carrito = document.querySelector('.carrito');
const offcanvasfooter = document.querySelector('.carrito .offcanvas-footer');
const offcanvasbody = document.querySelector('.carrito .offcanvas-body');
const subtotal = document.querySelector('.subtotal');
const total = document.querySelector('.total');
const contenedorCarrito = document.querySelector('.carrito .list ul')
let productosCarrito = [];

cargarEventListener();

function cargarEventListener() {

    document.addEventListener('DOMContentLoaded', () => {

        productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        crearHTML();

    });

    productos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarCurso);

}

function verificarCarrito() {

    if (productosCarrito.length == 0) {
        // Se desabilita el footer del canvas
        offcanvasfooter.classList.add('d-none');

        // Se desabilita el footer del canvas
        const row = document.createElement('div');
        row.classList.add('msj-vacio', 'w-100', 'h-100', 'd-flex', 'flex-column')
        row.innerHTML = `
                <span class="material-icons">
                    sentiment_very_dissatisfied
                </span>
                <p class="my-2"> Tu carrito está vacío.</p>`;
        offcanvasbody.appendChild(row)
    } else {
        offcanvasfooter.classList.remove('d-none');

        let carritoVacio = document.querySelector('.msj-vacio');

        if (carritoVacio) {
            carritoVacio.classList.add('d-none');

        }

    }
}


function eliminarCurso(e) {

    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {

        let cursoSeleccionado = e.target.getAttribute('data-id');

        // console.log("CURSO SELECCIONADO:", cursoSeleccionado)
        productosCarrito = productosCarrito.filter(item => item.id != parseInt(cursoSeleccionado));

        crearHTML();

    }

}



function agregarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {

        let seleccionado = e.target.parentElement.parentElement.parentElement.parentElement;

        obtenerInfoProducto(seleccionado);

    }

}

function obtenerInfoProducto(prod) {
    // Obtienes la información de producto seleccionado
    const info = {
        id: prod.querySelector('a.content-ac').getAttribute('data-id'),
        title: prod.querySelector('a.title').innerText,
        precio: prod.querySelector('span.price-dscto').innerText,
        cantidad: parseInt(prod.querySelector('input').value),
        img: prod.querySelector('img').getAttribute('src'),
        total: 0
    }

    info.total = info.cantidad * parseFloat(info.precio)
        // Guardar el producto seleccionado

    // (1) Evaluar que no se haya seleccionado anteriormente
    let existe = productosCarrito.some(item => item.id == info.id);


    if (!existe) {

        productosCarrito.push(info)
        crearHTML();

        $('#exampleModal').modal('show');

    } else {

        // Si ya ha sido agregado el producto => actualiza la cantidad

        let cursoActualizar = parseInt(info.id);

        productosCarrito.forEach(item => {

            if (item.id == cursoActualizar) {
                item.cantidad = info.cantidad
                crearHTML();
                $('#actualizarModal').modal('show');

            }

        });

    }

}



function crearHTML() {
    limpiar();
    verificarCarrito();

    productosCarrito.forEach(item => {
        const { id, title, cantidad, precio, img, total } = item
        const row = document.createElement('li');
        row.innerHTML = `
                
                <div class="img-product"><img src=${img} class="w-100"></div>
                <div class="px-1">
                    <p class="m-0 title"> ${title} (x${cantidad}) </p>    
                    <div class="d-flex justify-content-between">
                        <p class="m-0"> Precio unidad: <span class="price"> ${precio}</span> </p>    
                    </div>

                    <div class="d-flex justify-content-between">
                        <p class="neg m-0"> Precio total:  <span class="price"> ${total}</span> </p>    
                        <div>
                            <a href="" class="borrar-curso d-flex align-items-center" data-id="${id}" title="Quitar del carrito">
                                <span class="material-icons">
                                    delete_outline
                                </span>Quitar
                            </a>
                        </div>
                                                
                    </div>
                </div>
            `;

        contenedorCarrito.appendChild(row)
    });
    sincronizarLocalStorage();
    actualizarResumenCompra();

}

function actualizarResumenCompra() {
    let subtotallocal = 0;

    productosCarrito.forEach(item => {
        subtotallocal += item.total;
    });
    // console.log("SUBTOTAL :", subtotallocal)
    subtotal.innerText = subtotallocal.toFixed(2);

    // ACTUALIZAR EL TOTAL
    total.innerText = subtotallocal.toFixed(2);
}


function limpiar() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function sincronizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(productosCarrito))
}