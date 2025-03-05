const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    fullName: {
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
      default: "/uploads/default.png", 
      validate: {
          validator: function (value) {
              return value.startsWith("http") || value.startsWith("/uploads/"); 
          },
          message: "Profile image must be a valid image URL"
      }
  },
    salt: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    role: {
      type: String,
      enum: ["PIC", "Volunteer"],
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    uniqueId: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      min: 1,
      max: 5,
      required: function () {
        return this.role === "Volunteer"; // Only required for Volunteers
      },
    },
    department: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "Volunteer"; // Only required for Volunteers
      },
    },
    residenceType: {
      type: String,
      enum: ["Hostel", "Hall", "Day Scholar"],
      required: function () {
        return this.role === "Volunteer"; // Only required for Volunteers
      },
    },
    hostelName: {
      type: String,
      required: function () {
        return this.residenceType === "Hostel"; // Only required for Hostel residents
      },
      trim: true,
    },
    hallName: {
      type: String,
      required: function () {
        return this.residenceType === "Hall"; // Only required for Hall residents
      },
      trim: true,
    },
    address: {
      type: String,
      required: function () {
        return this.residenceType === "Day Scholar"; // Only required for Day Scholars
      },
      trim: true,
    },
  },
  { timestamps: true }
);

// Pre-save validation to check for missing fields based on role
adminSchema.pre("save", function (next) {
 
  try {
    if (this.role === "PIC") {
      // PIC should not have volunteer-specific fields
      this.year = undefined;
      this.department = undefined;
      this.residenceType = undefined;
      this.hostelName = undefined;
      this.hallName = undefined;
      this.address = undefined;
    }
  
    if (this.role === "Volunteer") {
      if (!this.year || !this.department || !this.residenceType) {
        return next(new Error("Year, Department, and Residence Type are required for Volunteers."));
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
  } catch (error) {
    next(error);
  }
});




module.exports = mongoose.model("Admin", adminSchema);
