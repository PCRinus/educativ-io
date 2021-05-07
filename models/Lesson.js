const { Schema, model } = require("mongoose");

const LessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  parentCategory: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lesson = model("lesson", LessonSchema);

module.exports = Lesson;
