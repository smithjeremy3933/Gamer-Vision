const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const User = require("../models/User");

module.exports = {
  getAllProjects: async (req, res, next) => {
    const projects = await Project.find({});
    res.send(projects);
  },

  createProject: async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(422)
        .send({ error: "You must provide a name and locations" });
    }

    const project = new Project({ title, description, userId: req.user });
    console.log(req.user);
    await project.save();
    res.send(project);
  },
};
