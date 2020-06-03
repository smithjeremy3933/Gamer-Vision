require("./models/Project");
require("./models/Script");
require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const allProjectRoutes = require("./routes/allProjectRoutes");
const scriptRoutes = require("./routes/scriptRoutes");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(projectRoutes);
app.use(allProjectRoutes);
app.use(scriptRoutes);

mongoUri =
  "mongodb+srv://admin:Shifty526@cluster0-a0kde.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo".err);
});

app.listen(3002, () => {
  console.log("Listening on port 3002");
});
