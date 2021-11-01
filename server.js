const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes/routes");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", route);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + process.env.PORT);
});
