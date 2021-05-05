const { Schema, model } = require("mongoose");
const slugify = require("slugify");

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
  // user_id: {
  //   type: String,
  //   required: true,
  // },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

LessonSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }
});

const Lesson = model("lesson", LessonSchema);

module.exports = Lesson;
