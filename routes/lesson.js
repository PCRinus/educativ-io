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

router.get("/:slug", async (req, res) => {
  try {
    const specificLesson = await Lesson.find({ slug: req.params.slug });
    if (!specificLesson) {
      throw new Error("Lesson was not found!");
    }
    res.status(200).json(specificLesson);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, description, parentCategory, markdown } = req.body;
  const newLesson = new Lesson({
    title,
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
