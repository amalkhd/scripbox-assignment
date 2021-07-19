const express = require("express");
const app = express();
const path = require("path");
const config = require("config");
const cors = require("cors");

app.use(cors());
require("./startup/routes")(app);

// connect DB
const connectDB = require("./startup/db");
connectDB();

// set the static files location
app.use("/", express.static(path.join(__dirname, "/dist/scripbox-assignment")));

const port = process.env.PORT || config.get("port");
app.get("/*", (req, res) => res.sendFile(path.join(__dirname)));

// Server
app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
