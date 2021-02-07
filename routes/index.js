const functions = require("../functions")

module.exports = function(app) {
    app.get('/', function(req, res) {
        if (req.query.name === undefined) {
            res.render('pages/index', { name: "user.svg", image: "user.svg"});
        } else {
            res.render('pages/index', { name: ", " + req.query.name, image: req.query.name.replace(/ .*/g, "") + ".jpg" });
        }
    });

    app.get('/chart.js', function(req, res) {
        res.sendFile(__dirname.replace("routes", "") + 'chart.js');
    });

    app.get('/serverClose', function(req, res) {
        if (req.query.key === "SuperSecretKey") {
            res.status(200).send("Recieved!")
            setTimeout(function(){ process.exit(0); }, 15000)
        } else if (req.query.key !== "SuperSecretKey"){
            res.status(403).send("Key Incorrect!")
        }
    });

    app.get('/shutDown', function(req, res) {
        if (req.query.key === "SuperSecretKey") {
            functions.shutDown()
            res.status(200).send("Recieved!")
        } else if (req.query.key !== "SuperSecretKey"){
            res.status(403).send("Key Incorrect!")
        }
    });

    app.get('/generic', function(req, res) {
        res.render('pages/generic');
    });

    app.get('/dashboard', function(req, res) {
        res.render('pages/dashboard');
    });

    app.get('/element', function(req, res) {
        res.render('pages/element');
    });
    
    app.get('/uploads', function(req, res) {
        res.render('pages/uploads')
    });

    app.get('/downloads', function(req, res) {
        res.render('pages/download');
    });

    app.get('/print', (req, res) => {
        res.render('./pages/print');
    });
};