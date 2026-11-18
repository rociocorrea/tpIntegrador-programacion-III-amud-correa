import { Router } from "express";
import {getAllProducts} from "../controllers/product.controllers.js"

const router = Router();

router.get("/", getAllProducts);

export default router; //Se exportan en archivo particular index.js