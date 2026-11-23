const urlBase = "http://localhost:3000";
const contenedorProducto = document.getElementById("contenedor-producto");
const getProductForm = document.getElementById("product-form");
const updateProductForm = document.getElementById("update-form");
const errorContainer = document.getElementById("errors");

let productIdFound = null;

getProductForm.addEventListener("submit", async (event) => {

    event.preventDefault();
    productIdFound = null;
    errorContainer.innerHTML = "";
    const idProd = event.target.idProduct.value.trim();

    if (!idProd) {
        return mostrarError("Ingresar Id válido");
    }

    try {
        const response = await fetch(`${urlBase}/api/products/${idProd}`);
        console.log(response); //Borrar

        const data = await response.json();

        if (!response.ok) {
            console.error(data.message);
            return mostrarError(data.message);
        }

        const producto = data.payload[0];
        productIdFound = idProd;

        renderizarProducto(producto);

    } catch (error) {
        console.error("Error al obtener producto: ", error);
        return mostrarError("Error de conexión con el servidor");
    }
});

async function renderizarModifProducto(product) {
    let htmlPut = `<form id="update-form">
                                <input type="hidden" name="id" id="idProd" value="${product.id}">
                                <label for="categoryProduct">Categoría</label>
                                    <select name="category" id="categoryProduct" required>
                                        <option value="belleza">Belleza</option>
                                        <option value="farmacia">Farmacia</option>
                                    </select>

                                <label for="imageProduct">Imagen</label>
                                <input type="text" name="image" id="imageProduct" value="${product.image}" required>

                                <label for="nameProduct">Nombre</label>
                                <input type="text" name="name" id="nameProduct" value="${product.name}" required>

                                <label for="priceProduct">Precio</label>
                                <input type="number" name="price" id="priceProduct" min="1" value="${product.price}" required>

                                <label for="activeProduct">Estado</label>
                                    <select name="active" id="activeProduct" required>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>

                                <input type="submit" class="boton" value="Modificar">

                            </form>`;
    updateProductForm.innerHTML = htmlPut;

    updateProductForm.addEventListener("submit", async (event) => {

        event.preventDefault();
        const formData = new FormData(event.target);
        const formObjt = Object.fromEntries(formData.entries());

        formObjt.price = Number(formObjt.price);
        formObjt.active = Number(formObjt.active);
        formObjt.name = formObjt.name.trim();

        const errors = validateForm(formObjt);

        if (errors.length > 0) {
            console.log(errors);
            return mostrarListaErrores(errors);
        }

        try {
            const response = await fetch(`${urlBase}/api/products`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObjt)
            });

            const data = await response.json();

            if (!response.ok) {
                updateProductForm.innerHTML = "";

                if (data.listaErrores) {
                    return mostrarListaErrores(data.listaErrores)
                }

                console.error(data.message);
                return mostrarError(data.message);
            }

            updateProductForm.innerHTML = "";
            contenedorProducto.innerHTML = "";
            alert(data.message); //Reemplazar por mensaje de éxito

        } catch (error) {
            console.error("Error al obtener producto: ", error);
            return mostrarError("Error de conexión con el servidor");
        }
    });
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${urlBase}/api/products/${productIdFound}`, {
            method: "DELETE"
        });
        console.log(response); //Borrar

        const data = await response.json();

        if (!response.ok) {
            console.error(data.message);
            return mostrarError(data.message);
        }

        alert(data.message);
        contenedorProducto.innerHTML = "";

    } catch (error) {
        console.error("Error al eliminar producto: ", error);
        return mostrarError("Error de conexión con el servidor");
    }
}

function renderizarProducto(producto) {
    let htmlProductos = `
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

    contenedorProducto.innerHTML = htmlProductos;

    const btnModificar = document.getElementById("btn-modificar");
    const btnEliminar = document.getElementById("btn-eliminar");

    btnModificar.addEventListener("click", async (event) => {

        if (!productIdFound) {
            return mostrarError("Ingresar Id válido");
        }

        const confirmacion = confirm("Está seguro que quiere modificar el producto?");

        if (!confirmacion) {
            alert("Modificación cancelada")
        }
        else {
            await renderizarModifProducto(producto);
        }
    });

    btnEliminar.addEventListener("click", async (event) => {

        if (!productIdFound) {
            return mostrarError("Ingresar Id válido");
        }

        const confirmacion = confirm("Está seguro que quiere eliminar el producto?");

        if (!confirmacion) {
            alert("Eliminación cancelada")
        }
        else {
            await eliminarProducto(productIdFound);
        }
    });
}

function armarError(mensaje) {
    return `<p class="error">${mensaje}</p>`;
}

function mostrarError(mensaje) {
    errorContainer.innerHTML = armarError(mensaje)
}

function mostrarListaErrores(array) {
    let htmlErrores = "";

    array.forEach(error => {
        htmlErrores += armarError(error);
    });

    errorContainer.innerHTML = htmlErrores;
}

function validateForm(data) {
    const validCategories = ["belleza", "farmacia"];
    const validStatus = [0, 1];
    const errors = [];
    console.log(data);
    const { category, image, name, price, active } = data;

    if (!category || !image || !name || !price) {
        errors.push("Faltan campos requeridos");
    }

    if (name.length < 2) {
        errors.push("El nombre debe tener más de dos caracteres");
    }

    if (price <= 0) {
        errors.push("El precio debe ser un número mayor a cero");
    }

    if (image.trim().length < 2) {
        errors.push("El enlace de la imagen debe tener más de dos caracteres");
    }

    if (!validCategories.includes(category)) {
        errors.push("La categoría es inválida");
    }

    if (!validStatus.includes(active)) {
        errors.push("El estado es inválido");
    }

    return errors;
}