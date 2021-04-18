// Third-Party Essential Libraries
import express from 'express';
import compression from "compression";
import cookies from "cookie-parser";
import mongoose from "mongoose";
import spdy from "spdy";
import { readFileSync } from "fs";

// Server Routes
import routes from "./routes/index.js";
import helpers from "./scripts/helpers";

const app = express();
const port = process.env.PORT;
const securePort = process.env.SECURE_PORT;
const requestLogger = (req, _, next) => {
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
};

app.use(requestLogger);

helpers.ip()
  .then((res) => {
    if (res === 0) {
      console.log('Server initialisation failed!');
      return;
    };
    if (res === 1) {
      app.use(compression());
      app.use(cookies());
      app.use(express.json());
      app.use(routes);
      app.use('/public', express.static(__dirname + '/public'));

      app.set('view engine', 'ejs');
      app.set('views', __dirname + '/views');

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
          if (error) { console.log(error); return; }
          helpers.serverLogging(0);
      });

      // Connecting to database
      const dbURI = process.env.DATABASE_LOGIN;
      mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
        .then(() => helpers.serverLogging(1))
        .catch((err) => console.log(err));

      app.listen(port);
      helpers.serverLogging(2);
    }
  });