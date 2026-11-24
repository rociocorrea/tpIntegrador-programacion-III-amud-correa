import { Router } from "express"
import { get, vistaPrincipal, create, home } from "../controllers/view.controllers.js";

const router = Router()

router.get("/home", home);

router.get("/principal", vistaPrincipal);

router.get("/get", get);

router.get("/create", create);

export default router;