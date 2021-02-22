const express = require('express');
const compression = require('compression');
const routes = require('./routes/index.js');
const printRoutes = require('./routes/printRoutes');
const functions = require("./scripts/functions")
const app = express();
const port = process.env.PORT;

app.use('/public', express.static(__dirname + '/public'));
app.use(compression())
app.use(function(req, res, next) {
    var dt = Date()
    var ip = req.ip.includes("::1") ? req.ip.replace(/::1/, "localhost") : req.ip.replace(/::ffff:192.168./, "(Local Client) 192.168.")
    d = dt.slice(4, 15).replace(/ /g, "/")
    t = dt.slice(16, 24)
    console.log(`${req.method} request from ${ip} for URL ${req.url} at ${t} on ${d}`) 
    next()
})
app.set('view engine', 'ejs');
functions.serverLogging()

routes(app);
printRoutes(app)

app.listen(port);