const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const auth = require("../middleware/auth");
const User = require("../models/user");

// @route   GET api/user
// @desc    Load user
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // drop the password
    res.json(user);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  body("username", "Username cannot be empty").notEmpty(),
  body("password", "Password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        username,
        password,
      });

      user.password = await bcrypt.hash(password, 10);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/user/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  body("username", "Username cannot be empty").notEmpty(),
  body("password", "Password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Username" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
