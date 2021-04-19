import { Router } from "express";
import helpers from "../scripts/helpers";
import { requireAuth, checkUser } from "../scripts/auth/authChecker";
import printRoutes from "./printRoutes";
import mediaRoutes from "./mediaRoutes";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";
const router = new Router();

router.use(authRoutes);
router.use(printRoutes);
router.use(mediaRoutes);
router.use(adminRoutes);
router.all('*', checkUser);

router.get('/', requireAuth, function(req, res) {
    if (req.query.name === undefined || req.query.name === "" || req.query.name === null) {
        res.render('pages/index');
    } else {
        var img = `${req.query.name.replace(/ .*/g, "")}.jpg`
        var exists = helpers.check(img, "/public/users/")
        if (exists) {
            res.render('pages/index', { name: req.query.name, image: img });
        } else {
            res.render('pages/index', { name: req.query.name, image: 'user.svg' });
        }
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

export default router;