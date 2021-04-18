import { Router } from 'express';
import functions from '../scripts/adminFunctions/adminFunctions';
import { requireAuth } from '../scripts/authFunctions/authChecker';
const router = new Router();

router.get('/data', requireAuth, async(_, res) => {
    const temp = await functions.getCPU();
    const arr = temp.filter(item => item);
    res.send(arr);
});

router.get('/serverClose', requireAuth, function(req, res) {
    if (req.query.key === "SuperSecretKey") {
        functions.stop(15000);
        res.status(200).send("Recieved!");
    } else if (req.query.key !== "SuperSecretKey"){
        res.status(403).send("Key Incorrect!");
    };
});

router.get('/shutDown', requireAuth, function(req, res) {
    if (req.query.key === "SuperSecretKey") {
        functions.shutDown(5);
        res.status(200).send("Recieved!");
    } else if (req.query.key !== "SuperSecretKey"){
        res.status(403).send("Key Incorrect!");
    };
});

export default router;