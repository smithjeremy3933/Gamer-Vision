const Authentication = require("../controllers/authentication");
const passportServices = require("../services/passport");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = mongoose.model("User");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

const router = express.Router();
router.use(cors());

router.post("/signin", requireSignin, Authentication.signin);
router.post("/signup", Authentication.signup);

module.exports = router;
