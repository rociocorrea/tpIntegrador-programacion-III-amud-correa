const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const createProductForm = document.getElementById("create-form");
const errorContainer = document.getElementById("errors");

createProductForm.addEventListener("submit", async (event) => {

    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    const formObjt = Object.fromEntries(formData.entries());

    formObjt.price = Number(formObjt.price);
    formObjt.name = formObjt.name.trim();
    formObjt.active = 1;

    const errors = validateForm(formObjt);

    if (errors.length > 0) {
        console.log(errors);
        return mostrarListaErrores(errors);
    }

    try {
        const response = await fetch(`${urlBase}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObjt)
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.listaErrores) {
                return mostrarListaErrores(data.listaErrores)
            }
            console.error(data.message);
            return mostrarError(data.message);
        }

        let message = `${data.message} con Id ${data.productId}`;
        console.log(message);
        alert(message); //Reemplazar por mensaje de éxito

    } catch (error) {
        console.error("Error al obtener producto: ", error);
        return mostrarError("Error de conexión con el servidor");
    }
});

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
    const errors = [];
    console.log(data);
    const { category, image, name, price } = data;

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

    return errors;
}