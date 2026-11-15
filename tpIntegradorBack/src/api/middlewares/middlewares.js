// Middleware logger
const logger = (req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
};

//Exportación para utilización en otros módulos
export {
    logger
}