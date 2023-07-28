const express = require("express");
const app = express();
const path = require("path");
const { connection } = require("../db/conn");
connection();
// const fileUpload = require("express-fileupload");
// app.use(fileUpload());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// const cors = require("cors");
// app.use(cors({ origin: "", credentials: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json({ limit: "10mb" }));
app.use(require("../routers/fileRouter"));
app.use(require("../routers/jobRouter"));
app.use(require("../routers/companyRouter"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
