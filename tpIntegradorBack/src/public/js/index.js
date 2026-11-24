const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");

let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


async function obtenerProductos() {
    try {
        const response = await fetch(`${urlBase}/api/products`);
        console.log(response);
        const data = await response.json();

        if (!response.ok) {
            console.error(data.message);
            return mostrarError(data.message);
        }

        productos = data.payload;
        renderizarProductos(productos);

    } catch (error) {
        console.error("Error al obtener productos: ", error);
        return mostrarError("Error de conexión con el servidor");
    }
}

function renderizarProductos(array) {
    let htmlProductos = "";

    array.forEach(producto => {
        console.log(producto.name.length);
        htmlProductos += `
                    <div class="card-producto">
                        <img class="card-img" src="${producto.image}" alt="${producto.name}">
                            <h4 title="${producto.name}">${producto.name.length > 40 ? `${producto.name.slice(0, 40)}...` : producto.name}</h4>
                            <p>$ ${producto.price}</p>
                            <p>Id: ${producto.id}</p>
                            <p>Estado: ${producto.active}</p>
                            <button type="button" class="btn-carrito" data-id="${producto.id}">
                                <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
                            </button>
                    </div>
                `;
    });

    contenedorProductos.innerHTML = htmlProductos;
}



contenedorProductos.addEventListener("click", (e) =>{
    const boton = e.target.closest(".btn-carrito");
    if (!boton) return;

    console.log(e)
    const idProducto = Number(boton.dataset.id) //dataset lee todos los atributos data-(nombre)
    agregarAlCarrito(e, idProducto)
    

});

function agregarAlCarrito(e, idProducto){
    const productoEncontrado = productos.find(p => p.id === idProducto);
    if (!productoEncontrado) return;

    const existeEnCarrito = carrito.find(p => p.id === idProducto);

    if (existeEnCarrito) {
        existeEnCarrito.cantidad++;
    } else {
        carrito.push({ ...productoEncontrado, cantidad: 1 });
    }

    actualizarCarrito();
}



// Actualizar Carrito, total, contadores y localStorage
function actualizarCarrito() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    const cartCountHeader = document.getElementById("cart-count-header");

    localStorage.setItem('carrito', JSON.stringify(carrito));

    if (carrito.length === 0) {
        cartList.innerHTML = `<li class="carrito-vacio">Tu carrito está vacío</li>`;
        if (cartTotal) cartTotal.textContent = "0";
        if (cartCountHeader) cartCountHeader.textContent = "0";
        return;
    }
    cartList.innerHTML = carrito.map(prod => `
        <li class="cart-item">
        <span>${prod.name} x${prod.cantidad} - $${(prod.price * prod.cantidad).toLocaleString("es-AR")}</span>
        <button type="button" onclick="quitarDelCarrito(event, ${prod.id})">Quitar</button>
        </li>
    `).join("");

    const total = carrito.reduce((acc, prod) => acc + (prod.price * prod.cantidad), 0);
    const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

    if (cartTotal) cartTotal.textContent = total.toLocaleString("es-AR");
    if (cartCountHeader) cartCountHeader.textContent = totalCantidad;


    }

// Quitar una unidad o borrar del carrito
function quitarDelCarrito(e, idProducto) {
  if (e) e.preventDefault();

  const prod = carrito.find(p => p.id === idProducto);

  if (prod) {
    prod.cantidad--;
    if (prod.cantidad === 0) {
      carrito = carrito.filter(p => p.id !== idProducto);
    }
  }

  actualizarCarrito();
}

// Vaciar Carrito completo
function vaciarCarrito(e) {
  if (e) e.preventDefault();
  carrito = [];
  actualizarCarrito();
}


function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `<p class="error">${mensaje}</p>`
}

obtenerProductos();