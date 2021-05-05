const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
      type: String
  },
  author: {
    type: String,
    required: true,
  }
});

const Category = model("categories", CategorySchema);

module.exports = Category;
