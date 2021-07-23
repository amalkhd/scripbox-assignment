const express = require("express");
const customers = require("../routes/customers");
const challenges = require("../routes/challenges");
const likes = require("../routes/likes");



module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/customers", customers);
  app.use("/api/challenges", challenges);
  app.use("/api/likes", likes);

};
