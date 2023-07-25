const express = require("express");
const router = express.Router();

//importing schema
const Company = require("../models/companySchema");

//Adding new job
router.post("/addCompany", async (req, res) => {
  const { Name, H1b_Sponserd, Location, file } = req.body;

  if (!Name || !H1b_Sponserd || !Location || !file) {
    return res.status(422).json({ message: "ERROR" });
  }
  try {
    const newCompany = new Company({
      Name,
      H1b_Sponserd,
      Location,
      file,
    });

    await newCompany.save();

    return res.status(200).json({ message: "Company added successfully !!" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/deleteCompany/:id", async (req, res) => {
  const deletedCompany = await Company.findOneAndDelete({ _id: req.params.id });
  return res.json(deletedCompany);
});

router.put("/updateCompany/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const updatedCompany = await Company.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  return res.json(updatedCompany);
});

router.get("/getAllCompany", async (req, res) => {
  const allCompanies = await Company.find();
  return res.json(allCompanies);
});

module.exports = router;
