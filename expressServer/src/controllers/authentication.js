const User = require("../models/User");
const jwt = require("jwt-simple");
const config = require("../config/config");

tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

module.exports = {
  signin: async (req, res, next) => {
    res.send({ token: tokenForUser(req.user) });
  },

  signup: async (req, res, next) => {
    const { email, password } = req.body;
    await User.findOne({ email: email }, (err, existingUser) => {
      if (err) {
        return next(err);
      }

      if (existingUser) {
        return res.status(422);
      }

      const user = new User({ email: email, password: password });
      user.save((err) => {
        if (err) {
          return next(err);
        }

        res.json({ token: tokenForUser(user) });
      });
    });
  },
};
