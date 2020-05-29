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

router.delete("/projects/:id", requireAuth, Projects.DeleteGame);

router.get("/projects", requireAuth, Projects.getUserProjects);

router.post("/projects", requireAuth, Projects.createProject);

router.patch("/projects/:id", requireAuth, Projects.editProject);

router.get("/projects/:id", requireAuth, Projects.getMyProject);

module.exports = router;
