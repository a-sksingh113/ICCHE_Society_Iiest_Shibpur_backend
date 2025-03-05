const Admin = require("../models/adminsModel");
const Activity = require("../models/activitiesModels");
const Alumni = require("../models/alumniModel");
const ClothDonation = require("../models/donationModel");
const Farewell = require("../models/farewellModel");
const Festival = require("../models/festivalModel");
const Gallery = require("../models/galleryModel");
const FresherInduction = require("../models/fresherInductionModel");
const Student = require("../models/studentModel");
const Volunteer = require("../models/volunteerModel");
const PDFDocument = require("pdfkit");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { createTokenForUser } = require("../services/authService");

const {
  sendForgetPasswordURL,
  sendWelcomeEmail,
  sendApprovalEmail,
  sendApprovedEmail,
  sendApprovalRejectEmail,
  sendAdminDashboardReportEmail,
  sendAdminDashboardReportEmailPDF,
  sendStudentReportEmailPDF,
  sendStudentReportEmailEXCEL,
  sendVolunteerReportEmailEXCEL,
  sendVolunteerReportEmailPDF,
} = require("../middleware/emailSendMiddleware");
const handleAdminSignup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      contactNumber,
      gender,
      role,
      uniqueId,
      year,
      department,
      residenceType,
      hostelName,
      hallName,
      address,
    } = req.body;
    const profileImageURL = req.file ? req.file.path : "/uploads/default.png";

    // Role-based validation
    if (
      !fullName ||
      !email ||
      !password ||
      !contactNumber ||
      !gender ||
      !role ||
      !uniqueId
    ) {
      return res.status(400).json({
        message:
          "Full Name, Email, Password, Contact, Gender,  Role and uniqueId are required.",
      });
    }
    if (role === "Volunteer") {
      if (!year || !department || !residenceType) {
        return res.status(400).json({
          message:
            "Year, Department, and Residence Type are required for Volunteers.",
        });
      }

      if (residenceType === "Hostel" && !hostelName) {
        return res
          .status(400)
          .json({ message: "Hostel name is required for Hostel residents." });
      }

      if (residenceType === "Hall" && !hallName) {
        return res
          .status(400)
          .json({ message: "Hall name is required for Hall residents." });
      }

      if (residenceType === "Day Scholar" && !address) {
        return res
          .status(400)
          .json({ message: "Address is required for Day Scholars." });
      }
    }

    //if Admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists with this email." });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      fullName,
      email,
      password: hashedPassword,
      contactNumber,
      gender,
      role,
      uniqueId,
      year: role === "Volunteer" ? year : undefined,
      department: role === "Volunteer" ? department : undefined,
      residenceType: role === "Volunteer" ? residenceType : undefined,
      hostelName: residenceType === "Hostel" ? hostelName : undefined,
      hallName: residenceType === "Hall" ? hallName : undefined,
      address: residenceType === "Day Scholar" ? address : undefined,
      profileImageURL,
      isApproved: false, // Needs approval from Admin or who incharge of websites
    });
    await newAdmin.save();
    await sendApprovalEmail(newAdmin.email, newAdmin.fullName);
    res.status(201).json({
      message:
        "Signup successful. Waiting for approval or You should be approved by Admin or who incharge of websites",
      user: newAdmin,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const handleAdminSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    // Check if admin is approved
    if (!admin.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Admin approval pending. Contact the PIC or Admin.",
      });
    }
    // **Compare the entered password with the stored hashed password**
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = createTokenForUser(admin);
    if (!token) {
      throw new Error("Token generation failed");
    }
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error sign-in:", error);
    return res
      .status(401)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const handleAdminLogout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
const handleUpdateAdmin = async (req, res) => {
  const { adminId } = req.params;
  const {
    contactNumber,
    year,
    department,
    residenceType,
    hostelName,
    hallName,
    address,
  } = req.body;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    admin.contactNumber = contactNumber || admin.contactNumber;
    //  Volunteer
    if (admin.role === "Volunteer") {
      admin.year = year || admin.year;
      admin.department = department || admin.department;
      admin.residenceType = residenceType || admin.residenceType;

      if (residenceType === "Hostel") {
        admin.hostelName = hostelName || admin.hostelName;
      }
      if (residenceType === "Hall") {
        admin.hallName = hallName || admin.hallName;
      }
      if (residenceType === "Day Scholar") {
        admin.address = address || admin.address;
      }
    }
    if (req.file) {
      admin.profileImageURL = req.file.path;
    }
    await admin.save();
    return res
      .status(200)
      .json({ message: "Profile updated successfully", admin });
  } catch (error) {
    console.error("Error updating admin/PIC: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleAdminForgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // Generate Reset Token (valid for 1 hour)
    const resetToken = JWT.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Send Reset Email
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendForgetPasswordURL(admin.email, resetURL);
    return res.status(200).json({
      message: "Forget password link sent to your email",
      data: resetURL,
    });
  } catch (error) {
    console.error("Error in forgot password: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleAdminResetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { newPassword } = req.body;
    console.log("Received newPassword:", newPassword);

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }
    const decoded = JWT.verify(resetToken, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // Update Password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    admin.password = hashedPassword;
    await admin.save();
    // Send Welcome Email after password reset
    await sendWelcomeEmail(admin.email, admin.fullName);
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleAdminChangePassword = async (req, res) => {
  try {
    const { adminId } = req.params; // Admin's ID
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Old and new passwords are required" });
    }
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    //matching existing password of user
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect old password" });
    }
    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
    admin.password = newHashedPassword;
    await admin.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getPendingAdminsApproval = async (req, res) => {
  try {
    const pendingAdmins = await Admin.find({ isApproved: false });
    res.status(200).json({ success: true, pendingAdmins });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const handleApproveAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    // Update the isApproved field
    admin.isApproved = true;
    await admin.save();
    // Send approval email
    await sendApprovedEmail(admin.email, admin.fullName);
    res
      .status(200)
      .json({ success: true, message: "Admin approved successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const handleRejectAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    await Admin.findByIdAndDelete(adminId);
    // Send rejection email
    await sendApprovalRejectEmail(admin.email, admin.fullName);
    res
      .status(200)
      .json({ success: true, message: "Admin request rejected successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const getAdminDashboard = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalVolunteers = await Volunteer.countDocuments();
    const totalAlumni = await Alumni.countDocuments();
    const totalGalleryItems = await Gallery.countDocuments();
    const totalFestivals = await Festival.countDocuments();
    const totalActivities = await Activity.countDocuments();
    const totalFarewell = await Farewell.countDocuments();
    const totalInduction = await FresherInduction.countDocuments();
    const totalDonationDrive = await ClothDonation.countDocuments();
    res.status(200).json({
      success: true,
      message: "Admin dashboard data fetched successfully",
      data: {
        totalStudents,
        totalVolunteers,
        totalAlumni,
        totalFestivals,
        totalActivities,
        totalGalleryItems,
        totalFarewell,
        totalInduction,
        totalDonationDrive,
      },
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching admin dashboard data",
      error: error.message || error,
    });
  }
};

const sendAdminReport = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    // Fetch counts from the database
    const totalStudents = await Student.countDocuments();
    const totalVolunteers = await Volunteer.countDocuments();
    const totalAlumni = await Alumni.countDocuments();
    const totalGalleryItems = await Gallery.countDocuments();
    const totalFestivals = await Festival.countDocuments();
    const totalActivities = await Activity.countDocuments();
    const totalFarewell = await Farewell.countDocuments();
    const totalInduction = await FresherInduction.countDocuments();
    const totalDonationDrive = await ClothDonation.countDocuments();
    await sendAdminDashboardReportEmail(
      admin.email,
      admin.fullName,
      totalStudents,
      totalVolunteers,
      totalAlumni,
      totalGalleryItems,
      totalFestivals,
      totalActivities,
      totalFarewell,
      totalInduction,
      totalDonationDrive
    );
    res
      .status(200)
      .json({ success: true, message: "Admin report sent successfully" });
  } catch (error) {
    console.error("Error sending admin report:", error);
    res
      .status(500)
      .json({ success: false, message: "Error sending admin report", error });
  }
};

const sendAdminReportPDF = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    // Fetch statistics from the database
    const stats = {
      totalStudents: await Student.countDocuments(),
      totalVolunteers: await Volunteer.countDocuments(),
      totalAlumni: await Alumni.countDocuments(),
      totalGalleryItems: await Gallery.countDocuments(),
      totalFestivals: await Festival.countDocuments(),
      totalActivities: await Activity.countDocuments(),
      totalFarewell: await Farewell.countDocuments(),
      totalInduction: await FresherInduction.countDocuments(),
      totalDonationDrive: await ClothDonation.countDocuments(),
    };
    // Generate PDF report
    const pdfPath = path.join(__dirname, `admin_report_${Date.now()}.pdf`);
    await generatePDFReport(pdfPath, admin.fullName, stats);
    // Send email with PDF attachment
    await sendAdminDashboardReportEmailPDF(
      admin.email,
      admin.fullName,
      pdfPath
    );
    // Delete the PDF file after sending
    fs.unlinkSync(pdfPath);
    res
      .status(200)
      .json({ success: true, message: "Admin report sent successfully" });
  } catch (error) {
    console.error("Error sending admin report:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error sending admin report",
        error: error.message,
      });
  }
};
/**
 * Generates a PDF report and saves it to the given file path.
 */
const generatePDFReport = async (pdfPath, adminName, stats) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);
      // Title
      doc
        .fontSize(18)
        .text("ICCHE Website Report", { align: "center" })
        .moveDown(2);
      // Admin Name
      doc.fontSize(14).text(`Admin Name: ${adminName}`).moveDown();
      // Report Data
      Object.entries(stats).forEach(([key, value]) => {
        doc.fontSize(12).text(`${key.replace(/total/, "Total ")}: ${value}`);
      });
      // Finalize PDF
      doc.end();
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};

const sendStudentReportPDF = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    // Fetch all students
    const students = await Student.find(
      {},
      "fullName uniqueId gender studentClass address"
    );
    // Generate PDF
    const pdfPath = path.join(__dirname, `student_report_${Date.now()}.pdf`);
    await generateStudentReportPDF(pdfPath, admin.fullName, students);
    // Send Email with PDF attachment
    await sendStudentReportEmailPDF(admin.email, admin.fullName, pdfPath);
    // Delete the PDF after sending
    fs.unlinkSync(pdfPath);
    res
      .status(200)
      .json({ success: true, message: "Student report sent successfully" });
  } catch (error) {
    console.error("Error sending student report:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error sending student report",
        error: error.message,
      });
  }
};

const generateStudentReportPDF = async (pdfPath, adminName, students) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 30 });
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);
      // Title
      doc
        .fontSize(18)
        .text(" ICCHE Student Report", { align: "center" })
        .moveDown(2);
      doc.fontSize(14).text(`Admin: ${adminName}`).moveDown();
      doc.fontSize(12).text(`Total Students: ${students.length}`).moveDown(2);
      // Table Headers
      doc
        .fontSize(12)
        .text(
          "S.No   Name                  Unique ID        Gender       Class          Address",
          { underline: true }
        );
      doc.moveDown(0.5);
      // Student Data Table
      students.forEach((student, index) => {
        doc
          .fontSize(10)
          .text(
            `${index + 1}. ${student.fullName.padEnd(
              20
            )} ${student.uniqueId.padEnd(12)} ${student.gender.padEnd(
              8
            )} ${student.studentClass.padEnd(6)} ${student.address}`,
            { continued: false }
          );
      });

      doc.end();
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};

const generateStudentExcelReport = async (filePath) => {
  try {
    const students = await Student.find();
    const studentData = students.map((student) => ({
      "Full Name": student.fullName,
      "Unique ID": student.uniqueId,
      Gender: student.gender,
      Class: student.studentClass,
      Address: student.address,
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(studentData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, filePath);
  } catch (error) {
    throw new Error("Error generating student report: " + error.message);
  }
};

const sendStudentExcelReport = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    const filePath = path.join(__dirname, `student_report_${Date.now()}.xlsx`);
    await generateStudentExcelReport(filePath);
    await sendStudentReportEmailEXCEL(admin.email, admin.fullName, filePath);
    fs.unlinkSync(filePath); // Delete file after sending
    res
      .status(200)
      .json({ success: true, message: "Student report sent successfully" });
  } catch (error) {
    console.error("Error sending student report:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error sending student report",
        error: error.message,
      });
  }
};

const generateVolunteerExcelReport = async (filePath) => {
  try {
    const volunteers = await Volunteer.find();
    const volunteerData = volunteers.map((volunteer) => ({
      "Full Name": volunteer.fullName,
      "Enrollment No": volunteer.enrollmentNo,
      Email: volunteer.email,
      Gender: volunteer.gender,
      "Contact No": volunteer.contactNumber,
      Year: volunteer.year,
      department: volunteer.department,
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(volunteerData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Volunteers");
    XLSX.writeFile(workbook, filePath);
  } catch (error) {
    throw new Error("Error generating volunteer report: " + error.message);
  }
};
const sendVolunteerExcelReport = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    const filePath = path.join(
      __dirname,
      `volunteer_report_${Date.now()}.xlsx`
    );
    await generateVolunteerExcelReport(filePath);
    await sendVolunteerReportEmailEXCEL(admin.email, admin.fullName, filePath);
    fs.unlinkSync(filePath);
    res
      .status(200)
      .json({ success: true, message: "Volunteer report sent successfully" });
  } catch (error) {
    console.error("Error sending volunteer report:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error sending volunteer report",
        error: error.message,
      });
  }
};


const sendVolunteerReportPDF = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    // Fetch all students
    const volunteers = await Volunteer.find(
      {},
      "fullName email contactNumber enrollmentNo gender year department "
    );
    // Generate PDF
    const pdfPath = path.join(__dirname, `volunteer_report_${Date.now()}.pdf`);
    await generateVolunteerReportPDF(pdfPath, admin.fullName, volunteers);
    // Send Email with PDF attachment
    await sendVolunteerReportEmailPDF(admin.email, admin.fullName, pdfPath);
    // Delete the PDF after sending
    fs.unlinkSync(pdfPath);
    res
      .status(200)
      .json({ success: true, message: "Volunteer report sent successfully" });
  } catch (error) {
    console.error("Error sending volunteer report:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error sending volunteer report",
        error: error.message,
      });
  }
};

const generateVolunteerReportPDF = async (pdfPath, adminName, volunteers) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 30 });
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);

      // Title
      doc
        .fontSize(18)
        .text("ICCHE Volunteer Report", { align: "center" })
        .moveDown(2);

      doc.fontSize(14).text(`Admin: ${adminName}`).moveDown();
      doc.fontSize(12).text(`Total Volunteers: ${volunteers.length}`).moveDown(2);

      // Table Headers
      doc
        .fontSize(12)
        .text(
          "S.No   Full Name           Email              Contact No       Enrollment No   Gender  Year  Department",
          { underline: true }
        );
      doc.moveDown(0.5);

      // Volunteer Data Table
      volunteers.forEach((volunteer, index) => {
        doc
          .fontSize(10)
          .text(
            `${(index + 1).toString().padEnd(5)} ${volunteer.fullName.padEnd(20)} ${volunteer.email.padEnd(25)} ${volunteer.contactNumber.padEnd(15)} ${volunteer.enrollmentNo.padEnd(15)} ${volunteer.gender.padEnd(8)} ${volunteer.year.padEnd(6)} ${volunteer.department}`,
            { continued: false }
          );
      });

      doc.end();
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};



module.exports = {
  handleAdminSignup,
  handleAdminSignin,
  handleAdminLogout,
  handleUpdateAdmin,
  handleAdminForgetPassword,
  handleAdminResetPassword,
  handleAdminChangePassword,
  getPendingAdminsApproval,
  handleApproveAdmin,
  handleRejectAdmin,
  getAdminDashboard,
  sendAdminReport,
  sendAdminReportPDF,
  sendStudentReportPDF,
  sendStudentExcelReport,
  sendVolunteerExcelReport,
  sendVolunteerReportPDF,
};
