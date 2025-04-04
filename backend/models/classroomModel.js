const mongoose = require("mongoose");
const classroomSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: [true, "day name is required"],
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
    date: {
        type: Date,
        required: [true, "classroom date is required"],
        unique: true, 
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: "Farewell date must be in the past"
        }
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
