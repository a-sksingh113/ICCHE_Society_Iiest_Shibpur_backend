const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    profileImageURL: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    role: {
      type: String,
      enum: ["PIC", "Admin"],
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    uniqueId: {
      type: String,
      trim: true,
      default: null,
    },
    year: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    department: {
      type: String,
      trim: true,
      default: null,
    },
    residenceType: {
      type: String,
      enum: ["Hostel", "Hall", "Day Scholar"],
      required: true,
      default: null,
    },
    hostelName: {
      type: String,
      required: true,
      trim: true,
      default: null,
    },
    hallName: {
      type: String,
      required: true,
      trim: true,
      default: null,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

// to ensure correct fields based on role
adminSchema.pre("save", function (next) {
  if (this.role === "PIC" && !this.uniqueId) {
    return next(new Error("Unique ID is required for PIC."));
  }
  if (this.role === "Admin") {
    if (!this.year || !this.department) {
      return next(new Error("Year and Department are required for Admin."));
    }
    if (this.residenceType === "Hostel" && !this.hostelName) {
      return next(new Error("Hostel name is required for Hostel residents."));
    }
    if (this.residenceType === "Hall" && !this.hallName) {
      return next(new Error("Hall name is required for Hall residents."));
    }
    if (this.residenceType === "Day Scholar" && !this.address) {
      return next(new Error("Address is required for Day Scholars."));
    }
  }
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
