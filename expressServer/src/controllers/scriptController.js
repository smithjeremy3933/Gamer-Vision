const mongoose = require("mongoose");
const Script = mongoose.model("Script");
const User = require("../models/User");

module.exports = {
  createScript: async (req, res, next) => {
    const { scriptTitle } = req.body;
    const { id } = req.params;

    if (!scriptTitle) {
      return res.status(422).send({ error: "You must provide a name" });
    }
    const script = new Script({ scriptTitle, projectId: id });
    console.log(script);
    await script.save().then((script) => res.send(script));
  },

  getScripts: async (req, res, next) => {
    const { id } = req.params;
    const scripts = await Script.find({ projectId: id });
  },
};
