const express = require('express');
const compression = require('compression');
const cookies = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const printRoutes = require('./routes/printRoutes');
const functions = require("./scripts/functions")
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = process.env.PORT;

app.use('/public', express.static(__dirname + '/public'));
app.use(compression())
app.use(cookies())
app.use(express.json());

app.use(function(req, res, next) {
    var dt = Date()
    var ip = req.ip.includes("::1") ? req.ip.replace(/::1/, "localhost") : req.ip.replace(/::ffff:192.168./, "(Local Client) 192.168.")
    d = dt.slice(4, 15).replace(/ /g, "/")
    t = dt.slice(16, 24)
    console.log(`${req.method} request from ${ip} for URL ${req.url} at ${t} on ${d}`) 
    next()
})

app.use(function (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500).render("pages/50x.ejs")
  }
)

const dbURI = process.env.DATABASE_LOGIN;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');
functions.serverLogging();

routes(app);
printRoutes(app)
app.use(authRoutes);

app.listen(port);