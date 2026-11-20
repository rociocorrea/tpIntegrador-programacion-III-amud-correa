// Middleware logger
const logger = (req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
};

const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El id es inválido: ingrese un número entero positivo"
        });
    }
    req.id = id;
    next();
};

const validateProduct = (req, res, next) => {
    const validCategories = ["belleza", "farmacia"];
    const validStatus = [0, 1];
    const errors = [];

    const { category, image, name, price, active } = req.body;

    if (!category || !image || !name || !price) {
        errors.push("Faltan campos requeridos");
    }

    if (typeof name !== "string" || name.trim().length < 2) {
        errors.push("El nombre debe tener más de dos caracteres");
    }

    if (typeof price !== "number" || price <= 0) {
        errors.push("El precio debe ser un número mayor a cero");
    }

    if (typeof image !== "string" || image.trim().length < 2) {
        errors.push("El enlace de la imagen debe tener más de dos caracteres");
    }

    if (!validCategories.includes(category)) {
        errors.push("La categoría es inválida");
    }

    if (!validStatus.includes(active)) {
        errors.push("El estado es inválido");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Datos inválidos",
            listErrors: errors
        });
    }

    next();
};

//Exportación para utilización en otros módulos
export {
    logger,
    validateId,
    validateProduct
}