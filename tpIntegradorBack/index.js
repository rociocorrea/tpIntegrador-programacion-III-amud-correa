import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { logger } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

const app = express();
const PORT = environments.port;

app.use(cors());
app.use(logger);

app.use("/api/products", productRoutes);
app.use("/api/products/:id", productRoutes);

//Esto es de testing, borrar luego
app.get("/", (req, res) => {
    res.send("Hola desde Express.js!");
});

//Esto se podría dejar
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});