const express = require("express");
const router = express.Router();
const { Customer, validateCustomer } = require("../models/customer");

router.get("/", async (req, res) => {
  const customers = await Customer.find();

  const data = {
    status: true,
    data: customers,
  };
  res.send(data);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findOne({ $or:[{customerId: req.params.id}, {email: req.params.id}] });
  if (!customer) return res.status(404).send("Customer id does not exist");

  const data = {
    status: true,
    data: customer,
  };
  res.send(data);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const exist = await Customer.findOne({ email: req.body.email });
  if (exist) return res.status(409).send("Email already exist");
  let customer = new Customer({
    email: req.body.email,
    fullName: req.body.fullName,
  });
  const id = customer._id.toString();
  customer.customerId = customer.email.split("@")[0] + id.substr(id.length - 4);
  customer = await customer.save();
  res.send(customer);
});

module.exports = router;
