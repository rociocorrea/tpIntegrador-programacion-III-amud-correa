import ProductModels from "../models/product.models.js";

export const vistaPrincipal = async (req, res) => {

    try {
        const [rows] = await ProductModels.selectAllProducts();

        console.log(rows);
        res.render("index", {
            title: "Principal",
            listaProductos: rows
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}

export const get = async (req, res) => {
    res.render("get", {
        title: "Obtener"
    });
};

export const create = async (req, res) => {
    res.render("create", {
        title: "Crear"
    });
};