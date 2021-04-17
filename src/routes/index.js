import functions from "../scripts/functions";
import { requireAuth, checkUser } from "../scripts/authChecker";
import printRoutes from "./printRoutes";
import mediaRoutes from "./mediaRoutes";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";
import { Router } from "express";

const router = new Router();

router.use(authRoutes);
router.use(printRoutes);
router.use(mediaRoutes);
router.use(adminRoutes);
router.use(function(req, _, next) {
    var dt = Date();
    var ip = req.ip.includes("::1") ? req.ip.replace(/::1/, "localhost") : req.ip.replace(/::ffff:192.168./, "(Local Client) 192.168.");
    var d = dt.slice(4, 15).replace(/ /g, "/");
    var t = dt.slice(16, 24);
    if (req.url.includes('public')) {
        next();
    }
    else {
        console.log(`${req.method} request from ${ip} for URL ${req.url} at ${t} on ${d}`);
        next();
    }
});
router.get('*', checkUser);

router.get('/', requireAuth, function(req, res) {
    if (req.query.name === undefined || req.query.name === "" || req.query.name === null) {
        res.render('pages/index');
    } else {
        var img = `${req.query.name.replace(/ .*/g, "")}.jpg`
        var exists = functions.check(img, "/public/users/")
        if (exists) {
            res.render('pages/index', { name: req.query.name, image: img });
        } else {
            res.render('pages/index', { name: req.query.name, image: 'user.svg' });
        }
    }
});

router.get('/serverClose', requireAuth, function(req, res) {
    if (req.query.key === "SuperSecretKey") {
        res.status(200).send("Recieved!")
        setTimeout(function(){ process.exit(0); }, 15000)
    } else if (req.query.key !== "SuperSecretKey"){
        res.status(403).send("Key Incorrect!")
    }
});

router.get('/shutDown', requireAuth, function(req, res) {
    if (req.query.key === "SuperSecretKey") {
        functions.shutDown()
        res.status(200).send("Recieved!")
    } else if (req.query.key !== "SuperSecretKey"){
        res.status(403).send("Key Incorrect!")
    }
});

router.get('/generic', requireAuth, function(_, res) {
    res.render('pages/generic');
});

router.get('/dashboard', requireAuth, function(_, res) {
    res.render('pages/dashboard');
});

router.get('/element', requireAuth, function(_, res) {
    res.render('pages/element');
});

router.get('/uploads', requireAuth, function(_, res) {
    res.render('pages/uploads')
});

router.get('/downloads', requireAuth, function(_, res) {
    res.render('pages/download');
});

router.get('/print', requireAuth, (_, res) => {
    res.render('./pages/print');
});

module.exports = router;