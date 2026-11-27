import ProductModels from "../models/sales.models.js";

export const postSale = async (req, res) => {
    try {
        console.log(req.body);
        const { date, totalPrice, userName, idProducts } = req.body;
        const [result] = await ProductModels.insertSale(date, totalPrice, userName);

        for (const element of idProducts) {
            await ProductModels.insertProductSale(element, result.insertId);
        }

        res.status(201).json({
            message: "La venta fue creada correctamente",
            productId: result.insertId
        });

    } catch (error) {
        console.log("Error creando venta: ", error);

        res.status(500).json({
            message: "Error interno al crear venta"
        });
    }
}