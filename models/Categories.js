const { Schema, model } = require("mongoose");

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
      type: String
  }
});

const Categories = model("categories", CategoriesSchema);

module.exports = Categories;
