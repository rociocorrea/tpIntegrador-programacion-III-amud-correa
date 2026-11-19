// Middleware logger
const logger = (req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
};

const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0){
        return res.status(400).json({
            message: "El id es inválido: ingrese un número entero positivo"
        });
    }
    req.id = id;
    next();
};

//Exportación para utilización en otros módulos
export {
    logger,
    validateId
}