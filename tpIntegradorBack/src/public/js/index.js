const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");

async function obtenerProductos() {
    try {
        const response = await fetch(`${urlBase}/api/products`);
        console.log(response);
        const data = await response.json();

        if (!response.ok) {
            console.error(data.message);
            return mostrarError(data.message);
        }

        const productos = data.payload;
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

                            <ul class="iconos">
                                <li>
                                    <i id="btn-modificar" class="fa-solid fa-pen-to-square"></i>
                                </li>
                                <li>
                                    <i id="btn-eliminar" class="fa-solid fa-trash-can"></i>
                                </li>
                            </ul>
                    </div>
                `;
    });

    contenedorProductos.innerHTML = htmlProductos;
}

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `<p class="error">${mensaje}</p>`
}

obtenerProductos();