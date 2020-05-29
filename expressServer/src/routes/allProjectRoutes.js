const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Projects = require("../controllers/projectController");
const passport = require("passport");
const passportServices = require("../services/passport");
const Project = mongoose.model("Project");

const router = express.Router();
router.use(cors());

router.get("/allprojects", Projects.getAllProjects);

module.exports = router;
