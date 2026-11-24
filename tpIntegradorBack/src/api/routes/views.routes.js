import { Router } from "express"
import { get, vistaPrincipal, create } from "../controllers/view.controllers.js";

const router = Router()

router.get("/principal", vistaPrincipal);

router.get("/get", get);

router.get("/create", create);

export default router;