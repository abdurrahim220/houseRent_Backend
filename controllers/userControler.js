const User = require("../models/user");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, role, password } = req.body;

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
      return res.send("User already register");
    }

    const newUser = new User({ username, role, email, password });
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
    // res.json({ message: "Register the user" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found!!");
    }

    const token = jwt.sign(
        { user: { _id: user._id, email: user.email, username: user.username } },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1m",
        }
      );

      res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
  res.json({ message: "Login user" });
};

const currentUser = async (req, res) => {
  res.json({ message: "Register the user" });
};

module.exports = { registerUser, loginUser, currentUser };
