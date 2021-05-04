const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
      type: String
  }
});

const Category = model("categories", CategorySchema);

module.exports = Category;
