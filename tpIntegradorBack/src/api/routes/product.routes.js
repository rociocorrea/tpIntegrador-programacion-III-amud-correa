import { Router } from "express";
import {getAllProducts, getProductById, deleteProductById} from "../controllers/product.controllers.js"
import { validateId } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", validateId, getProductById);
router.delete("/:id", validateId, deleteProductById);

export default router; //Se exportan en archivo particular index.js