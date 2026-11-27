import { Router } from "express"
import { postSale } from "../controllers/sales.controllers.js";
import {requireLogin} from "../middlewares/middlewares.js"

const router = Router()

router.post("/", postSale);

export default router;