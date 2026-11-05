import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

const app = express();
const PORT = environments.port;

app.use(cors());

// Middleware logger
app.use((req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// GET all products
app.get("/api/products", async (req, res) => {
    const [rows] = await connection.query("SELECT * FROM products");

    res.status(200).json({
        payload: rows
    })
});

app.get("/", (req, res) => {
    res.send("Hola desde Express.js!");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});