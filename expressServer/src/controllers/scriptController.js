const mongoose = require("mongoose");
const Script = mongoose.model("Script");
const User = require("../models/User");

module.exports = {
  createScript: async (req, res, next) => {
    const { scriptTitle } = req.body;
    if (!scriptTitle) {
      return res
        .status(422)
        .send({ error: "You must provide a name and locations" });
    }
  },
};
