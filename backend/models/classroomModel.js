const mongoose = require("mongoose");
const classroomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "festivalGallery title is required"],
      trim: true,
    },
    volunteersPresent: {
      type: String,
      required: [true, "volunteerPresent is required"],
    },
    studentsPresent: {
      type: String,
      required: [true, "studentsPresent is required"],
    },
    coverImageURL: [
      {
        type: String,
        validate: {
          validator: function (value) {
            return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(value);
          },
          message: " coverImageURL must be valid image URLs",
        },
      },
    ],
  },
  { timestamps: true }
);
const Classroom = mongoose.model("Classroom", classroomSchema);
module.exports = Classroom;
