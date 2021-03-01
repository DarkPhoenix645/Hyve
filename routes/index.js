const functions = require("../scripts/functions")
const { requireAuth, checkUser } = require('../scripts/authChecker')

module.exports = function(app) {
    app.get('*', checkUser)

    app.get('/', requireAuth, function(req, res) {
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
    
    app.get('/serverClose', requireAuth, function(req, res) {
        if (req.query.key === "SuperSecretKey") {
            res.status(200).send("Recieved!")
            setTimeout(function(){ process.exit(0); }, 15000)
        } else if (req.query.key !== "SuperSecretKey"){
            res.status(403).send("Key Incorrect!")
        }
    });

    app.get('/shutDown', requireAuth, function(req, res) {
        if (req.query.key === "SuperSecretKey") {
            functions.shutDown()
            res.status(200).send("Recieved!")
        } else if (req.query.key !== "SuperSecretKey"){
            res.status(403).send("Key Incorrect!")
        }
    });

    app.get('/generic', requireAuth, function(req, res) {
        res.render('pages/generic');
    });

    app.get('/dashboard', requireAuth, function(req, res) {
        res.render('pages/dashboard');
    });

    app.get('/element', requireAuth, function(req, res) {
        res.render('pages/element');
    });
    
    app.get('/uploads', requireAuth, function(req, res) {
        res.render('pages/uploads')
    });

    app.get('/downloads', requireAuth, function(req, res) {
        res.render('pages/download');
    });

    app.get('/print', requireAuth, (req, res) => {
        res.render('./pages/print');
    });
};