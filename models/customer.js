const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: false,
    default: "",
  },
  customerId: {
    type: String,
    required: true,
    default: "",
  },
});
const Customer = mongoose.model("Customer", customerSchema);

function validate(customer) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    fullName: Joi.string(),
  });

  return schema.validate(customer);
}

exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validateCustomer = validate;
