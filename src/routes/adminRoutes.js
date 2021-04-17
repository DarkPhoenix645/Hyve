import functions from "../scripts/functions";
import { requireAuth } from "../scripts/authChecker";
import { Router } from "express";
const router = new Router();

router.get("/data", requireAuth, async(req, res) => {
    var arr = await functions.getCPU()
    arr = arr.filter(item => item)
    res.send(arr)
    res.end();
});

module.exports = router;