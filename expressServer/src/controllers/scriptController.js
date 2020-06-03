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
    await script
      .save()
      .then((script) => res.send(script))
      .catch((err) => err.status(422).json(err));
  },

  getScripts: async (req, res, next) => {
    const { id } = req.params;
    const scripts = await Script.find({ projectId: id })
      .then((script) => res.send(script))
      .catch((err) => err.status(422).json(err));
  },

  getScript: async (req, res, next) => {
    const { id } = req.params;
  },

  deleteScript: async (req, res, next) => {
    const { id } = req.params;
  },
};
