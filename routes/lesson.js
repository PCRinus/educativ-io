const { Router } = require("express");
const Lesson = require("../models/Lesson");
const { ensureLogin } = require("../middlewares/auth");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const lessonData = await Lesson.find({});
    if (!lessonData) {
      throw new Error("No lessons were added, add some!");
    }
    res.status(200).json(lessonData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, description, parentCategory, markdown } = req.body;
  const newLesson = new Lesson({
    name,
    description,
    parentCategory,
    markdown,
  });

  try {
    const lessonData = await newLesson.save();
    if (!lessonData) {
      throw new Error("There was an error adding the lesson");
    }
    res.status(200).json(lessonData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
