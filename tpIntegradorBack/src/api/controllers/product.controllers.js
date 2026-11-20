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

//CREATE
export const postProduct = async(req, res) =>{
    try {
        const {category, image, name, price} = req.body;
        const [result] = await ProductModels.insertProduct(category, image, name, price);
        
        res.status(201).json({
            message: "El producto fue creado correctamente",
            productId: result.insertId
        });

    } catch (error) {
        console.log("Error obteniendo producto: ", error);

        res.status(500).json({
            message: "Error interno al obtener producto"
        });
    }
}

//DELETE 
export const deleteProductById = async (req, res) => {
    try{
        const [rows] = await ProductModels.selectProductById(req.id);
        
        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontró el producto con id: ${req.id}`
            })
        }

        await ProductModels.deleteProductById(req.id);

        res.status(200).json({
            message: `Producto con id ${req.id} eliminado correctamente`
        })

    }catch(error)
    {
        console.log("Error obteniendo producto: ", error);

        res.status(500).json({
            message: "Error interno al obtener producto"
        });
    }
};