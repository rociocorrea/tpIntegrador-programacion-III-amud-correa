import { Router } from "express"

const router = Router()

router.get("/principal", (req, res) => {
    res.render("index");
});

router.get("/get", (req, res) => {
    res.render("get");
});

router.get("/create", (req, res) => {
    res.render("create");
});

export default router;