import express from "express";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /users - list all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /users/profile - update your own profile (protected)
router.put("/profile", protect, async (req, res) => {
    try {
        const { skills, role, available } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { skills, role, available },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({
            message: "Profile updated",
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /users/matches?skill=React - find teammates by skill
router.get("/matches", async (req, res) => {
    try {
        const { skill, role } = req.query;

        const filter = { available: true };

        if (skill) {
            filter.skills = { $in: [new RegExp(skill, "i")] };
        }
        if (role) {
            filter.role = role;
        }

        const matches = await User.find(filter).select("-password");

        if (matches.length === 0) {
            return res.status(404).json({ message: "No matches found" });
        }

        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;