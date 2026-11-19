import ProductModels from "../models/product.models.js";

// GET all products
export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectAllProducts();

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            })
        }

        res.status(200).json({
            payload: rows
        })
    }
    catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
};

//GET by Id
export const getProductById = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectProductById(req.id);
        
        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontró el producto con id: ${req.id}`
            })
        }

        res.status(200).json({
            payload: rows
        })
    }
    catch (error) {
        console.log("Error obteniendo producto: ", error);

        res.status(500).json({
            message: "Error interno al obtener producto"
        });
    }
};