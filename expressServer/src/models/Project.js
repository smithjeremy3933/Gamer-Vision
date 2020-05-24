const mongoose = require("mongoose");

const projectDetailSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  userId: {
    type: String,
    default: "",
  },
});

mongoose.model("Project", projectDetailSchema);
