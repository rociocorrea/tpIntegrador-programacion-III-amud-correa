import { Router } from "express"
import { get, vistaPrincipal, create, update, deleteProduct } from "../controllers/view.controllers.js";
import {requireLogin} from "../middlewares/middlewares.js"

const router = Router()

router.get("/principal", requireLogin, vistaPrincipal);
router.get("/get", requireLogin, get);
router.get("/create", requireLogin, create);
router.get("/update", requireLogin, update);
router.get("/delete", requireLogin, deleteProduct);

export default router;