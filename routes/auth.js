const express = require("express");
const router = express.Router();
const User = require("../models/user");

const jwt = require("jsonwebtoken");

router
  .post("/register", async (req, res) => {
    try {
      const { username, role, email, password } = req.body;

      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email or username already exists" });
      }

      const newUser = new User({ username, role, email, password });
      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  })

  .post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("User not found!!");
      }

      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "3h",
        }
      );
      const { password, ...info } = user._doc;
      res.cookie("token", token).status(200).json(info);
    } catch (error) {
      res.status(500).json(error);
    }
  });

//logout

router.get("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
});

module.exports = router;
