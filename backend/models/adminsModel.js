const { createHmac, randomBytes } = require("crypto");
const mongoose = require("mongoose");
const { createTokenForUser } = require("../services/authService");

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
      required: function () {
        return this.role === "PIC"; // Only required for PIC
      },
      unique: true,
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
      if (!this.uniqueId) {
        return next(new Error("Unique ID is required for PIC."));
      }
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
      // Volunteer should not have PIC's uniqueId
      this.uniqueId = undefined;
    }
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");
    this.salt = salt;
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
adminSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    try {
      const user = await this.findOne({ email });
      if (!user) throw new Error("User not found");

      const salt = user.salt;
      const hashedPassword = user.password;
      const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

      if (userProvidedHash !== hashedPassword)
        throw new Error("Invalid password");

      const token = createTokenForUser(user);

      return token;
    } catch (error) {
      throw error;
    }
  }
);



module.exports = mongoose.model("Admin", adminSchema);
