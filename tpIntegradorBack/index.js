import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { logger } from "./src/api/middlewares/middlewares.js";
import { authRoutes, productRoutes, viewRoutes, salesRoutes } from "./src/api/routes/index.js";
import {__dirname, join} from "./src/api/utils/index.js"
import session from "express-session";

//Configuramos EJS como motor de plantilla

const app = express();
const { port, session_key} = environments
const PORT = port;

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

app.use(express.static(join(__dirname, "src/public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})) //Middleware para parsear los datos que recibimos de un HTML <form>
app.use(logger);

app.use(session({
    secret: session_key,
    resave: false,  //Evita guardar la sesion si no hubo cambios
    saveUninitialized: true //No guarda sesiones vacias
}))

app.use("/api/products", productRoutes);
app.use("/dashboard", viewRoutes);
app.use("/api/sales", salesRoutes);

//Rutas de autenticacion
app.use("/", authRoutes);

//Esto es de testing, borrar luego
app.get("/", (req, res) => {res.send("Hola desde Express.js!");
});

//Esto se podría dejar
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});