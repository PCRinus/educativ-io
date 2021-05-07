const { Schema, model } = require("mongoose");
const { default: slugify } = require("slugify");
const sulify = require("slugify");

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
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

LessonSchema.pre("validate", function(next) {
  if(this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    })
  }
  next();
})

const Lesson = model("lesson", LessonSchema);

module.exports = Lesson;
