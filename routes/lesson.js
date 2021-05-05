const { Router } = require("express");
const Lesson = require("../models/Lesson");
const { ensureLogin } = require("../middlewares/auth");

const router = Router();

router.get("/", ensureLogin, async (req, res) => {
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

router.get("/:slug", ensureLogin, async (req, res) => {
  try {
    const specificLesson = await Lesson.findOne({ slug: req.params.slug });
    if (!specificLesson) {
      throw new Error("Lesson was not found!");
    }
    res.status(200).json(specificLesson);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", ensureLogin, async (req, res) => {
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

router.delete("/:id", ensureLogin, async (req, res) => {
  try {
    const deletedLesson = await Lesson.findByIdAndDelete(req.params.id)
    if(!deletedLesson) {
      throw new Error("There was an error deleting this lesson");
    }
    res.status(200).json(deletedLesson);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})

module.exports = router;
