process.title = "zyae-music";
process.env.NODE_ENV === "production";
Error.stackTraceLimit = -1;

const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const cors = require("cors");

const port = 446;

const https_config = {
  cert: fs.readFileSync("C:/ssl/certificate_data/__zyae_net.crt"),
  ca: fs.readFileSync("C:/ssl/certificate_data/__zyae_net.ca-bundle"),
  key: fs.readFileSync("C:/ssl/certificate_data/__zyae_net.key"),
};

const app = express();
const https_server = https.createServer(https_config, app);

var whitelist = [
  "http://localhost:3000",
  "http://192.168.1.45:3000",
  "http://zyae.net:3000",
];
var cors_config = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(cors_config));
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ error: true, response: err.message }); // Bad request
  }
  next();
});

app.use(express.static(__dirname + "/client/build"));

// routes
app.use("/api/", require("./api"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

// app.all("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/frontend/public/notfound.html"));
// });

https_server.listen(port, () => {
  console.log("Prototype 0.02 started on port: " + port);
});
