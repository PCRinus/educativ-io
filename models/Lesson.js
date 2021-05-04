const { Schema, model } = require("mongoose");

const LessonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: String,
    required: true,
  },
});

const Lesson = model("lesson", LessonSchema);

module.exports = Lesson;
