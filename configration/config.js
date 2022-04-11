//******  connection using mongoose ******//

const mongoose = require("mongoose");

const dbConnection = () =>
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((result) => {
      console.log("db Connected");
    })
    .catch((error) => {
      console.log("error at Connected");
    });

module.exports = dbConnection;
