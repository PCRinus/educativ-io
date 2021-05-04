const { Router } = require("express");
const Category = require("../models/Categories");

const router = Router();

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const newCategory = new Category({
    name,
    description,
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
