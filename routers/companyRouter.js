const express = require("express");
const router = express.Router();

const company = require("../models/company_schema");

router.post("/addCompany", async (req, res) => {
  const { name, h1b_sponsored, location, logo, website } = req.body;

  if (!name || !h1b_sponsored || !location || !logo || !website) {
    return res.status(422).json({ message: "ERROR" });
  }
  try {
    const new_company = new company({
      name,
      h1b_sponsored,
      location,
      logo,
      website,
    });

    await new_company.save();

    return res.status(201).json({ message: "Company added successfully !!" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/deleteCompany/:id", async (req, res) => {
  await company.findOneAndDelete({
    _id: req.params.id,
  });
  return res.status(200).json(res);
});

router.put("/updateCompany/:id", async (req, res) => {
  const { id } = req.params;
  await company.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
  return res.status(200).json(res);
});

router.get("/getAllCompany", async (req, res) => {
  const all_companies = await company.find();
  if (!all_companies) {
    return res.status(204).json(res);
  }
  return res.status(200).json(res);
});

module.exports = router;
