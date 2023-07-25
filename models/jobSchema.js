const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Skills: {
    type: String,
    required: true,
  },
  Domain: {
    type: String,
    required: true,
  },
  EstimatedPay: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("JOBS", jobSchema);
module.exports = Job;
