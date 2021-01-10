const express = require('express');
const compression = require('compression');
const routes = require('./routes/index.js');
const printRoutes = require('./routes/printRoutes');
const functions = require("./functions")
const app = express();
const port = 8080;

app.use('/public', express.static(__dirname + '/public'));
app.use(compression())
app.set('view engine', 'ejs');
functions.serverLogging()

routes(app);
printRoutes(app)

app.listen(port);