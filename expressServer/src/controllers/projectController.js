const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const User = require("../models/User");

module.exports = {
  getAllProjects: async (req, res, next) => {
    const projects = await Project.find({});
    res.send(projects);
  },

  getUserProjects: async (req, res, next) => {
    const projects = await Project.find({ userId: req.user._id })
      .then((project) => {
        res.send(project);
      })
      .catch((err) => err.status(422).json(err));
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
    const project = await Project.findById(req.params.id)
      .then((project) => {
        res.send(project);
      })
      .catch((err) => err.status(422).json(err));
  },

  DeleteGame: async (req, res, next) => {
    const { id } = req.params;
    const projectProps = await Project.findById(id)
      .then((project) => project.remove())
      .then((project) => res.json(project))
      .catch((err) => err.status(422).json(err));
  },

  editProject: async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body)
      .then((project) => res.json(project))
      .catch((err) => err.status(422).json(err));
  },
};
