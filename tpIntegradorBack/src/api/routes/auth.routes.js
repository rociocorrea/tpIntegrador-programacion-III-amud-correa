//Rutas de autenticacion
import { Router } from "express";
import { getLogin, logout, validateLogin } from "../controllers/auth.controllers.js";
const router = Router();

//Vista del login
router.get("/login", getLogin);

//Endpont que atendera las peticiones POST a /login
router.post("/login", validateLogin)
router.post("/logout", logout)

//Exporatmos las rutas
export default router;