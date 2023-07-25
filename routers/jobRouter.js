const express = require("express");
const router = express.Router();

//importing schema
const Job = require("../models/jobSchema");
const { error } = require("console");

//Adding new job
router.post("/addJob", async (req, res) => {
  const { Title, Description, Skills, Domain, EstimatedPay, Location } =
    req.body;

  if (
    !Title ||
    !Description ||
    !Skills ||
    !Domain ||
    !EstimatedPay ||
    !Location
  ) {
    return res.status(422).json({ message: "Error" });
  }
  try {
    const newJob = new Job({
      Title,
      Description,
      Skills,
      Domain,
      EstimatedPay,
      Location,
    });

    console.log(newJob);
    await newJob.save();

    return res.status(200).json({ message: "Job added successfully !!" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.put("/updateJob/:id", async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  return res.json(job);
});

router.delete("/deleteJob/:id", async (req, res) => {
  const deletedJob = await Job.findOneAndDelete({ _id: req.params.id });
  return res.json(deletedJob);
});

router.get("/getAllJobs", async (req, res) => {
  const allJobs = await Job.find();
  return res.json(allJobs);
});

module.exports = router;
