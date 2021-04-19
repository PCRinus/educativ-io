const {Router} = require('express');
const Profile = require('../models/Profile');
const {ensureLogin} = require("../middlewares/auth");

const router = Router();

router.get("/", ensureLogin, async(req, res) => {
    try {
        const profileData = await Profile.find({ user_id: req.user._id });
        if(!profileData) {
            throw new Error("No profile added");
        }
        res.status(200).json(profileData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/", ensureLogin, async(req, res) => {
    const {firstName, lastName, age} = req.body;
    const newProfileData = new Profile({
        firstName,
        lastName,
        age,
        user_id: req.user._id,
    });

    try {
        const profileData = await newProfileData.save();
        if (!profileData) {
            throw new Error("There was an error saving your profile");
          }
          res.status(200).json(profileData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;