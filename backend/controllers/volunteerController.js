const Volunteer = require("../models/volunteerModel");
const handleAddVolunteer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      contactNumber,
      enrollmentNo,
      gender,
      year,
      department,
      residenceType,
      hostelName,
      hallName,
      address,
    } = req.body;
    const coverImageURL = req.file ? req.file.path : "/uploads/default.png";
    // Ensure required fields are provided
    if (
      !fullName ||
      !email ||
      !contactNumber ||
      !enrollmentNo ||
      !gender ||
      !year ||
      !department ||
      !residenceType
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if enrollment number already exists
    const existingVolunteer = await Volunteer.findOne({ enrollmentNo });
    if (existingVolunteer) {
      return res
        .status(400)
        .json({ message: "Volunteer with this Enrollment No already exists" });
    }
    const newVolunteer = new Volunteer({
      fullName,
      email,
      contactNumber,
      enrollmentNo,
      gender,
      year,
      department,
      residenceType,
      hostelName: residenceType === "Hostel" ? hostelName : null,
      hallName: residenceType === "Hall" ? hallName : null,
      address: residenceType === "Day Scholar" ? address : null,
      coverImageURL,
    });

    await newVolunteer.save();
    res
      .status(201)
      .json({
        message: "Volunteer added successfully",
        volunteer: newVolunteer,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add volunteer", error: error.message });
  }
};

const handleUpdateVolunteer = async (req, res) => {
  try {
    const {
      email,
      contactNumber,
      year,
      residenceType,
      hostelName,
      hallName,
      address,
    } = req.body;

    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // Update fields if provided
    volunteer.email = email || volunteer.email;
    volunteer.contactNumber = contactNumber || volunteer.contactNumber;
    volunteer.year = year || volunteer.year;
    volunteer.residenceType = residenceType || volunteer.residenceType;
    volunteer.hostelName = hostelName || volunteer.hostelName;
    volunteer.hallName = hallName || volunteer.hallName;
    volunteer.address = address || volunteer.address;

    // Update cover image if provided
    if (req.file) {
      volunteer.coverImageURL = req.file.path;
    }

    await volunteer.save();
    res
      .status(200)
      .json({ message: "Volunteer updated successfully", volunteer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update volunteer", error: error.message });
  }
};

const handleDeleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    await Volunteer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete volunteer", error: error.message });
  }
};

const getAllVolunteer = async (req, res) => {
  try {
    const { fullName, enrollmentNo, year, department } = req.query;
    let filter = {};
    // GET /api/volunteers?name=Satish
    if (fullName) {
      filter.fullName = { $regex: fullName, $options: "i" }; // Case-insensitive partial match
    }
    //GET /api/volunteers?enrollmentNo=2023ITB104
    if (enrollmentNo) {
      filter.enrollmentNo = enrollmentNo; // Exact match
    }
    if (year) {
      filter.year = year; // Exact match
    }
    if (department) {
      filter.department = department; // Exact match
    }

    const volunteers = await Volunteer.find(filter);
    res.status(200).json(volunteers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve volunteers", error: error.message });
  }
};
const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.status(200).json(volunteer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve volunteer", error: error.message });
  }
};

module.exports = {
  handleAddVolunteer,
  handleUpdateVolunteer,
  handleDeleteVolunteer,
  getAllVolunteer,
  getVolunteerById,
};
