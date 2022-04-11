require("dotenv").config();
const express = require("express");
const usersRoutes = require("./src/users/routes/usersRoutes");
const postsRoutes = require("./src/posts/routes/postsRoutes");
const reportsRoutes = require("./src/reports/routes/reportsRoutes");
const dbConnection = require("./configration/config.js");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

dbConnection();
app.use(usersRoutes);
app.use(postsRoutes);
app.use(reportsRoutes);

app.listen(port, () => {
  console.log(`App listening in port ${port}!`);
});
