const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Scripts = require("../controllers/scriptController");
const passport = require("passport");
const passportServices = require("../services/passport");
const requireAuth = passport.authenticate("jwt", { session: false });

const Script = mongoose.model("Script");

const router = express.Router();
router.use(cors());

router.post(`/projects/:id/scripts`, requireAuth, Scripts.createScript);

router.get(`/projects/:id/scripts`, requireAuth, Scripts.getScripts);

module.exports = router;
