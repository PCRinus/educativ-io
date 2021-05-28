const { Router } = require("express");
const Category = require("../models/Categories");
const { ensureLogin } = require("../middlewares/auth");

const router = Router();

router.get("/", ensureLogin, async (req, res) => {
  try {
    const categoriesData = await Category.find({});
    if (!categoriesData) {
      throw new Error("No categories were added, add some!");
    }
    res.status(200).json(categoriesData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/fromUser/:author", ensureLogin, async (req, res) => {
  try {
    const userCategoriesData = await Category.find({author: req.params.author});
    if (!userCategoriesData) {
      throw new Error("The user didn't add any categories!");
    }
    res.status(200).json(userCategoriesData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", ensureLogin, async (req, res) => {
  const { name, description } = req.body;
  const newCategory = new Category({
    name,
    description,
    author: req.user.username,
  });

  try {
    const categoryData = await newCategory.save();
    if (!categoryData) {
      throw new Error("There was an error adding the category");
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
