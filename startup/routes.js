const express = require("express");
const customers = require("../routes/customers");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/customers", customers);
};
