// Third-Party Essential Libraries
const express = require('express');
const compression = require('compression');
const cookies = require('cookie-parser');
const mongoose = require('mongoose');

// Server Routes
const routes = require('./routes/index.js');
const printRoutes = require('./routes/printRoutes');
const functions = require("./scripts/functions")
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT;

app.use('/public', express.static(__dirname + '/public'));
app.use(compression());
app.use(cookies());
app.use(express.json());
app.use(authRoutes);
app.set('view engine', 'ejs');

// Request Logging
app.use(function(req, res, next) {
    var dt = Date()
    var ip = req.ip.includes("::1") ? req.ip.replace(/::1/, "localhost") : req.ip.replace(/::ffff:192.168./, "(Local Client) 192.168.")
    d = dt.slice(4, 15).replace(/ /g, "/")
    t = dt.slice(16, 24)
    console.log(`${req.method} request from ${ip} for URL ${req.url} at ${t} on ${d}`) 
    next()
})

// Connecting to database
const dbURI = process.env.DATABASE_LOGIN;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log("Connected to database"))
  .catch((err) => console.log(err));

routes(app);
printRoutes(app)
functions.serverLogging();

app.get('*', function(req, res, next) {
  req.accepts('html') ? res.status(404).render("pages/404.ejs") : res.status(404).json({ error: "File not found" })
})

app.listen(port);