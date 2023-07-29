const mongoose = require("mongoose");

const job_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
  },
  domain: {
    type: String,
    required: true,
  },
  branch: [
    {
      name: {
        type: String,
        required: true,
      },
      domain: {
        type: String,
        required: true,
      },
    },
  ],
  embedding: {
    type: String,
  },
  link: {
    type: String,
  },
  estimated_pay: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const job = mongoose.model("JOBS", job_schema);
module.exports = job;
