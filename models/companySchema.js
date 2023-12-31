const mongoose = require("mongoose");

const company_schema = new mongoose.Schema({
  cname: {
    type: String,
    required: true,
  },
  h1b_sponsored: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  logo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const company = mongoose.model("COMPANIES", company_schema);
module.exports = company;
