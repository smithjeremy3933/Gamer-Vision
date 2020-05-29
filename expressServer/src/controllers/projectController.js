const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const User = require("../models/User");

module.exports = {
  getAllProjects: async (req, res, next) => {
    const projects = await Project.find({});
    res.send(projects);
  },

  getUserProjects: async (req, res, next) => {
    const projects = await Project.find({ userId: req.user._id }).then(
      (project) => {
        res.send(project);
      }
    );
  },

  createProject: async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(422)
        .send({ error: "You must provide a name and locations" });
    }
    const project = new Project({ title, description, userId: req.user });
    await project.save();
    res.send(project);
  },

  getMyProject: async (req, res, next) => {
    const project = await Project.findById(req.params.id).then((project) => {
      res.send(project);
    });
  },

  DeleteGame: async (req, res, next) => {
    const { id } = req.params;
    const projectProps = await Project.findById(id)
      .then((project) => project.remove())
      .then((project) => res.json(project));
  },

  editProject: async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findById(id)
      .then((project) => project.updateOne(req.body))
      .then((project) => res.json("Nice edit"))
      .catch((err) => res.status(422).json(err));
  },
};
