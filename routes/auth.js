const { Router } = require("express");
const passport = require("passport");
const User = require("../models/Users");

const router = Router();

router.get("/user", (req, res) => {
  if (req.user) {
    res.json(extractUser(req));
  } else {
    res.json({ user: null });
  }
});

router.post(
  "/signup",
  async (req, res, next) => {
    const { username, password } = req.body;
    try {
      await User.register({ username }, password);
    } catch (error) {
      if (error.name === "UserExistsError") {
        return res.status(400).json({ message: "User already exists" });
      }
      return res
        .status(500)
        .json({ message: "There was an error signing up the user" });
    }
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    res.json(extractUser(req));
  }
);

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logOut();
    res.json({ message: "Log out successfull" });
  } else {
    res.json({ message: "Already logged out" });
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(extractUser(req));
})

router.post('/change-password', (req, res, next) => {
    if(!req.user) {
        return res.json({message: "No user to change password"});
    }
    next()
}, async (req, res) => {
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword) {
        return res.status(400).json({message: "Invalid request"});
    }
    try {
        const user = await User.findById(req.user._id)
        await user.changePassword(oldPassword, newPassword);
        res.json({message: "Success, password was changed"});
    } catch (error) {
        if(error.name === 'IncorrectPasswordError') {
            return res.status(400).json({message: "Incorrect password"});
        }
        return res.status(500).json({message: "There was an error"});
    }
})

function extractUser(req) {
    const {username, _id} = req.user;
    return {user: {username, _id} };
}

module.exports = router;
