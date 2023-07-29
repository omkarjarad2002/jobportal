const express = require("express");
const router = express.Router();
const pdfParse = require("pdf-parse");
const natural = require("natural");

const TfIdf = require("node-tfidf");
const cosineSimilarity = require("cosine-similarity");

const job = require("../models/jobSchema");

router.post("/add_job", async (req, res) => {
  const {
    title,
    description,
    skills,
    domain,
    bname,
    bdomain,
    embedding,
    link,
    estimatedPay,
    location,
    company_id,
  } = req.body;
  console.log(req.body);

  if (
    !title ||
    !description ||
    !skills ||
    !domain ||
    !bname ||
    !bdomain ||
    !embedding ||
    !link ||
    !estimatedPay ||
    !location ||
    !company_id
  ) {
    return res.status(422).json(res);
  }
  try {
    const new_job = new job({
      title,
      description,
      skills,
      domain,
      branch: { bname, bdomain },
      embedding,
      link,
      estimated_pay: estimatedPay,
      location,
      company_id,
    });

    await new_job.save();

    return res.status(201).json({ message: res });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.put("/updateJob/:id", async (req, res) => {
  const { id } = req.params;
  const updated_job = await job.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  return res.status(200).json(res);
});

router.delete("/deleteJob/:id", async (req, res) => {
  const deletedJob = await job.findOneAndDelete({ _id: req.params.id });
  return res.status(200).json(res);
});

router.get("/getAllJobs", async (req, res) => {
  const get_jobs = await job.find();
  return res.status(200).json(get_jobs);
});

// router.post("/extractText", async (req, res) => {
//   let descriptions = [];
//   if (!req.body) {
//     res.status(400);
//     res.end();
//   }
//   if (req.body) {
//     let jobs = await Job.find();

//     for (var i = 0; i < jobs.length; i++) {
//       descriptions.push(jobs[i].Description.toString());
//     }
//   }

//   var text = "";

//   try {
//     let documents = [];
//     const file = `./uploads/${req.body.fileName}`;
//     pdfParse(file).then((result) => {
//       text = result.text.toString();
//       documents.push(text.toString());

//       const TfIdf = natural.TfIdf;
//       const tfidf1 = new TfIdf();
//       const tfidf2 = new TfIdf();

//       documents.forEach((document) => {
//         tfidf1.addDocument(document);
//       });

//       descriptions.forEach((description) => {
//         tfidf2.addDocument(description);
//       });

//       console.log(tfidf1, tfidf2);

//       const documentVectors = [];

//       tfidf1.documents.forEach((document, i) => {
//         const vector = {};

//         tfidf1.listTerms(i).forEach((item) => {
//           vector[item.term] = item.tfidf;
//         });
//         documentVectors.push(vector);
//       });

//       tfidf2.descriptions.forEach((document, i) => {
//         const vector = {};

//         tfidf2.listTerms(i).forEach((item) => {
//           vector[item.term] = item.tfidf;
//         });
//         documentVectors.push(vector);
//       });

//       console.log(documentVectors);

//       //////////////////////////////////////////////////////SIMILARITY//////////////////////////////////////
//       function calculateCosineSimilarity(vector1, descriptions) {
//         const terms = new Set([
//           ...Object.keys(vector1),
//           ...Object.keys(descriptions),
//         ]);
//         let dotProduct = 0;
//         let magnitude1 = 0;
//         let magnitude2 = 0;

//         terms.forEach((term) => {
//           const value1 = vector1[term] || 0;
//           const value2 = descriptions[term] || 0;

//           dotProduct += value1 * value2;
//           magnitude1 += value1 ** 2;
//           magnitude2 += value2 ** 2;
//         });

//         magnitude1 = Math.sqrt(magnitude1);
//         magnitude2 = Math.sqrt(magnitude2);

//         return dotProduct / (magnitude1 * magnitude2);
//       }

//       // Sample: Calculate cosine similarity between the first and second documents
//       const similarity = calculateCosineSimilarity(
//         documentVectors,
//         descriptions
//       );
//       console.log("Cosine similarity:", similarity);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/extractText", async (req, res) => {
  let jobDescriptions = [];
  if (!req.body) {
    res.status(400);
    res.end();
  }
  if (req.body) {
    let jobs = await Job.find();

    for (var i = 0; i < jobs.length; i++) {
      jobDescriptions.push(jobs[i].Description.toString());
    }
  }

  var text = "";

  try {
    let resume = [];
    const file = `./uploads/${req.body.fileName}`;
    pdfParse(file).then((result) => {
      text = result.text.toString();
      const lines = text.split("\n");
      resume.push(lines);

      function rankJobsWithResume(resumes, jobDescriptions, uploadedResume) {
        // Initialize the TF-IDF object
        const tfidf = new TfIdf();

        // Add the job descriptions and resumes to the TF-IDF object
        jobDescriptions.forEach((job) => tfidf.addDocument(job));
        resumes.forEach((resume) => tfidf.addDocument(resume));

        // Calculate TF-IDF scores
        const jobTfIdf = tfidf.tfidfs(jobDescriptions);
        const resumeTfIdf = tfidf.tfidfs(resumes);

        // Calculate cosine similarity between uploaded resume and job descriptions
        const similarityScores = jobTfIdf.map((jobTfIdfVector, index) =>
          cosineSimilarity(jobTfIdfVector, resumeTfIdf[uploadedResumeIndex])
        );

        // Combine job descriptions and their similarity scores
        const rankedJobs = jobDescriptions.map((job, index) => ({
          jobDescription: job,
          similarityScore: similarityScores[index],
        }));

        // Sort the jobs based on similarity scores in descending order
        rankedJobs.sort((a, b) => b.similarityScore - a.similarityScore);

        return rankedJobs;
      }

      const uploadedResumeIndex = 0; // Index of the uploaded resume in the resumes array

      const jobRankings = rankJobsWithResume(
        resume,
        jobDescriptions,
        uploadedResumeIndex
      );

      console.log(" jobRankings :", jobRankings);

      const rankedJobs = Object.keys(jobRankings).sort(
        (a, b) => jobRankings[b] - jobRankings[a]
      );
      console.log("rankedJobs :", rankedJobs);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
