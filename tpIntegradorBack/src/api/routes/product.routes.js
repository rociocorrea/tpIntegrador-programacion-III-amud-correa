import { Router } from "express";
import {getAllProducts, getProductById, postProduct, 
        putProduct, deleteProductById} from "../controllers/product.controllers.js"
import { validateId, validateProduct } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", validateId, getProductById);
router.post("/", validateProduct, postProduct);
router.put("/", validateProduct, putProduct);
router.delete("/:id", validateId, deleteProductById);

export default router; //Se exportan en archivo particular index.js