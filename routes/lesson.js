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

router.get("/fromCategory/:parentCategory", ensureLogin, async (req, res) => {
  try {
    const categoryLessonsData = await Lesson.find({
      parentCategory: req.params.parentCategory,
    });
    if (!categoryLessonsData) {
      throw new Error("The category doesn't have any lessons!");
    }
    res.status(200).json(categoryLessonsData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/fromUser/:author", ensureLogin, async (req, res) => {
  try {
    const userLessonsData = await Lesson.find({ author: req.params.author });
    if (!userLessonsData) {
      throw new Error("The user didn't add any lessons");
    }
    res.status(200).json(userLessonsData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/fromFavourites/:isFavourite", ensureLogin, async (req, res) => {
  try {
    const favouriteLessonsData = await Lesson.find({ isFavourite: req.params.isFavourite });
    if (!favouriteLessonsData) {
      throw new Error("There are no favourite lessons");
    }
    res.status(200).json(favouriteLessonsData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", ensureLogin, async (req, res) => {
  const { title, description, parentCategory, markdown } = req.body;
  const newLesson = new Lesson({
    title,
    description,
    author: req.user.username,
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

router.patch("/:id", ensureLogin, async (req, res) => {
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLesson) {
      throw new Error("There was a problem updating the lesson");
    }
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.sendStatus(404).json({ meesage: error.meesage });
  }
});

router.delete("/:id", ensureLogin, async (req, res) => {
  try {
    const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!deletedLesson) {
      throw new Error("There was an error deleting this lesson");
    }
    res.status(200).json(deletedLesson);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
