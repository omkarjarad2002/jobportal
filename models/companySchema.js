const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  H1b_Sponserd: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model("COMPANIES", companySchema);
module.exports = Company;
