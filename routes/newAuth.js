const express = require("express");
const jwt = require("jsonwebtoken");


const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/user");

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = user.password === password;

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });

        res.status(200).json({ userId: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Register route
router.post("/register", async (req, res) => {
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
});

// Validate token route
router.get("/validate-token", verifyToken, (req, res) => {
    res.status(200).send({ userId: req.userId });
});

// Logout route
router.post("/logout", (req, res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.send();
});

module.exports = router;
