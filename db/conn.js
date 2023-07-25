const mongoose = require("mongoose");
// const DB = process.env.DATABASE;
const connection = async (req, res) => {
  try {
    const response = await mongoose.connect(
      "mongodb+srv://omkarjarad:mKypP3B3tOirKImn@cluster0.ffzkjkq.mongodb.net/?retryWrites=true&w=majority"
    );
    if (response) {
      console.log("Connection Successful!");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { connection };
