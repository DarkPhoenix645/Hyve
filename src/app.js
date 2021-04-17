// Third-Party Essential Libraries
import express from 'express';
import compression from "compression";
import cookies from "cookie-parser";
import mongoose from "mongoose";
import spdy from "spdy";
import { readFileSync } from "fs";

// Server Routes
import routes from "./routes/index.js";
import functions from "./scripts/functions";

const app = express();
const port = process.env.PORT;
const securePort = process.env.SECURE_PORT;

app.use(compression());
app.use(cookies());
app.use(express.json());
app.use(routes);
app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

functions.serverLogging();

app.get('*', function(req, res) {
  req.accepts('html') ? res.status(404).render("pages/404.ejs") : res.status(404).json({ error: "File not found" })
});

// HTTP/2 Stuff and Port Listeners
const options = {
  key: readFileSync('./keys/server.key'),
  cert: readFileSync('./keys/server.crt')
};

spdy
  .createServer(options, app)
  .listen(securePort, (error) => {
    if (error) { console.log(error) }
    console.log(`Server running on ${securePort}`)
});

// Connecting to database
const dbURI = process.env.DATABASE_LOGIN;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.listen(port);