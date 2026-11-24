//Rutas de autenticacion
import { Router } from "express";
import connection from "../database/db.js";
const router = Router();

//Vista del login
router.get("/login", (req, res) =>{
    res.render("login",{
        title: "Login usuario",
        about: "Login de usuario admin"
    });
});

//Endpont que atendera las peticiones POST a /login
router.post("/login", async (req, res) =>{
    try {
        //Extraemos los datos que vienen del cuerpo de la peticion post
        const {email, password} = req.body

        if (!email || !password){
            return res.render("login", {
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Faltan email o password"
            });
        }

        const sql = "SELECT * FROM users where email = ? and password = ?";
        const [rows] = await connection.query(sql, [email, password]);

        //Chequeamos que exista el usuario
        if(rows.length === 0){
            return res.render("login",{
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Credenciales incorrectas"
            });
        }

        const user = rows[0];

        //Guardamos la sesion
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        //Creada la sesion redirigimos a la pantalla principal
        res.redirect("/dashboard/principal")

    //Endpoint para destruir sesion
    router.post("/logout", (req, res) =>{
        //Destruye la sesion
        req.session.destroy((err) =>{
            if(err){
                console.log("Error al destruir la sesion: ", err);
                return res.status(500).json({
                    message: "Error al cerrar la sesion"
                });
            }
            res.redirect("/login")
        })
    })

    } catch (error) {
        console.log("Error en el login: ", error)
        res.status(500).json({
            message: "Error interno en el servidor"
        })
    }
})

//Exporatmos las rutas
export default router;