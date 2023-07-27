const express = require("express");
const router = express.Router();
const pdfParse = require("pdf-parse");
const tfidf = require("tfidf");

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

router.post("/extractText", async (req, res) => {
  if (!req.body) {
    res.status(400);
    res.end();
  }
  if (req.body) {
    let arr = [];
    let jobs = await Job.find();
    for (var i = 0; i < jobs.length; i++) {
      arr.push(jobs[i].Description.toString());
    }
    console.log(arr);
    // tfidf = tfidf.fit(arr);
  }

  var text = "";

  try {
    const file = `./uploads/${req.body.fileName}`;
    pdfParse(file).then((result) => {
      text = result.text.toString();
      // console.log(text);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
