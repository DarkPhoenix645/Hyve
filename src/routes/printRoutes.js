import functions from "../scripts/printFunctions/printFunctions";
import { requireAuth } from "../scripts/authFunctions/authChecker";
import printData from "../scripts/printFunctions/printDataController";
import { Router } from "express";
const router = new Router();

router.post('/printFile', requireAuth, (req, res) => { 
    var fileName = `'${process.env.UPLOADS_DIR1}${req.query.fileName}'`      
    functions.printFunction(fileName);
    res.status('200')
});

router.get('/cancelAll', requireAuth, (req, res) => {
    functions.cancelAll();
    res.status(200);
});

router.get('/cancelOne', requireAuth, (req, res) => {
    functions.cancelOne(req.query.job_id);
    res.status(200);
});

router.get('/currentJobs', requireAuth, async (req, res) => {
    currentJobs = await functions.getCurrentJobs()
    currentJobs = JSON.stringify(currentJobs)
    res.status(200).send(currentJobs);
});

router.get('/printSettings', requireAuth, (req, res) => { printData.get(req, res); });
router.post('/printSettingsCreate', requireAuth, (req, res) => { printData.create(req, res); });
router.post('/printSettingsUpdate', requireAuth, (req, res) => { printData.update(req, res); });
router.post('/printSettingsReset', requireAuth, (req, res) => { printData.reset(req, res); });

export default router;