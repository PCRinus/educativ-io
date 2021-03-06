const { Router } = require("express");
// const multer = require("multer");
const Profile = require("../models/Profile");
const { ensureLogin } = require("../middlewares/auth");

const router = Router();

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// var upload = multer({ storage: storage });

router.get("/:userName", ensureLogin, async (req, res) => {
  try {
    const profileData = await Profile.findOne({
      userName: req.params.userName,
    }).sort({ _id: -1 });
    if (!profileData) {
      throw new Error("No profile added");
    }
    res.status(200).json(profileData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", ensureLogin, async (req, res) => {
  const { firstName, lastName, age } = req.body;
  const newProfileData = new Profile({
    firstName,
    lastName,
    age,
    user_id: req.user._id,
    userName: req.user.username,
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
});

module.exports = router;
