import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { logger } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";

const app = express();
const PORT = environments.port;

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

app.use(express.static(join(__dirname, "src/public")));
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/products", productRoutes);
app.use("/dashboard", viewRoutes);

//Esto es de testing, borrar luego
app.get("/", (req, res) => {
    res.send("Hola desde Express.js!");
});

//Esto se podría dejar
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});