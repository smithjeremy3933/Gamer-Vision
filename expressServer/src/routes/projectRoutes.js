const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Projects = require("../controllers/projectController");
const passport = require("passport");
const passportServices = require("../services/passport");
const requireAuth = passport.authenticate("jwt", { session: false });

const Project = mongoose.model("Project");

const router = express.Router();
router.use(cors());
const proxyurl = "https://cors-anywhere.herokuapp.com/";

router.delete("/projects", cors(), async (req, res) => {
  const { _id } = req.params;
  const projectProps = await Project.findByIdAndRemove(
    { _id: _id },
    req.body
  ).then((project) => {
    res.json(project);
  });
});

router.get("/projects", Projects.getAllProjects);

router.post("/projects", requireAuth, Projects.createProject);

module.exports = router;
