const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const user = require("../models/user");

// Sign up
exports.signUp = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = new User({
      email: req.body.email,
      password: hash,
    });
    newUser
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfuly",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

// Login
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ erroe: new Error("incorrect password") });
          }

          res.status(200).json({
            userId: user._id,
            token: "token",
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
