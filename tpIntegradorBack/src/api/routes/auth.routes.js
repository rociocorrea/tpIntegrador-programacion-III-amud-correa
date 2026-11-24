//Rutas de autenticacion
import { Router } from "express";
import connection from "../database/db.js";
import { getLogin, validateLogin } from "../controllers/auth.controllers.js";
const router = Router();

//Vista del login
router.get("/login", getLogin);

//Endpont que atendera las peticiones POST a /login
router.post("/login", validateLogin)

//Exporatmos las rutas
export default router;