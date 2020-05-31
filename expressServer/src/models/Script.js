const mongoose = require("mongoose");

const scriptSchema = new mongoose.Schema({
  scriptTitle: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

mongoose.model("Script", scriptSchema);
