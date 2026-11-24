import { Router } from "express"
import { get, vistaPrincipal, create, home } from "../controllers/view.controllers.js";
import {requireLogin} from "../middlewares/middlewares.js"

const router = Router()

router.get("/principal", requireLogin, vistaPrincipal);

router.get("/home", home);

router.get("/principal", vistaPrincipal);


router.get("/get", requireLogin, get);

router.get("/create", requireLogin, create);

export default router;