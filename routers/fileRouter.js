const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${Date.now()}-${crypto
      .randomBytes(6)
      .toString("hex")}${path.extname(file.originalname)}`;

    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

router.post("/uploadFile", upload.single("file"), (req, res) => {
  return res.json({ file: req.file });
});

module.exports = router;

// Name = Omkar Balaso Jarad
// email = omkarjarad2019@gmail.com
// location = Undawadi kade pathar, Baramati, Pune,Maharashtra
// postal code(Pin code) = 413102
