import AuthModels from "../models/auth.models.js";

export const getLogin = (req, res) =>{
    res.render("login",{
        title: "Login usuario",
        about: "Login de usuario admin"
    });
}

export const validateLogin = async (req, res) =>{
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

        const [rows] = await AuthModels.selectUser(email, password)

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
            res.redirect("/login", )
        })
    })

    } catch (error) {
        console.log("Error en el login: ", error)
        res.status(500).json({
            message: "Error interno en el servidor"
        })
    }
}