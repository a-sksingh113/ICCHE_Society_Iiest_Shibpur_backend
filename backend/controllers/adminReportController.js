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
    sendAdminDashboardReportEmail,
    sendAdminDashboardReportEmailPDF,
    sendStudentReportEmailPDF,
    sendStudentReportEmailEXCEL,
    sendVolunteerReportEmailEXCEL,
    sendVolunteerReportEmailPDF,
  } = require("../middleware/emailSendMiddleware");

  const handleSendAdminDashboardReportEmail = async (req, res) => {
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
  
  const handleSendAdminDashboardReportPDF = async (req, res) => {
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
  

  
  const handleSendStudentReportEmailPDF = async (req, res) => {
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
  
  const handleSendStudentReportEmailEXCEL = async (req, res) => {
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
const handleSendVolunteerReportEmailEXCEL = async (req, res) => {
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


const  handleSendVolunteerReportEmailPDF = async (req, res) => {
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
    handleSendAdminDashboardReportEmail,
    handleSendAdminDashboardReportPDF,
    handleSendStudentReportEmailPDF,
    handleSendStudentReportEmailEXCEL,
    handleSendVolunteerReportEmailEXCEL,
    handleSendVolunteerReportEmailPDF,
  };
  