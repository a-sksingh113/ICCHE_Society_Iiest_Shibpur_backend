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
const ExcelJS = require("exceljs");
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
  sendAlumniReportEmailEXCEL,
  sendAlumniReportEmailPDF,
} = require("../middleware/emailSendMiddleware");

// for email sending of admin dashboard report
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
// for email sending of student report pdf
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
    res.status(500).json({
      success: false,
      message: "Error sending admin report",
      error: error.message,
    });
  }
};

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
    res.status(500).json({
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
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");

    // Define columns
    worksheet.columns = [
      { header: "Full Name", key: "fullName", width: 20 },
      { header: "Unique ID", key: "uniqueId", width: 15 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Class", key: "studentClass", width: 12 },
      { header: "Address", key: "address", width: 30 },
    ];

    // Add rows
    students.forEach((student) => {
      worksheet.addRow({
        fullName: student.fullName,
        uniqueId: student.uniqueId,
        gender: student.gender,
        studentClass: student.studentClass,
        address: student.address,
      });
    });

    // Save file
    await workbook.xlsx.writeFile(filePath);
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

    // Delete the file after sending
    fs.unlinkSync(filePath);

    res
      .status(200)
      .json({ success: true, message: "Student report sent successfully" });
  } catch (error) {
    console.error("Error sending student report:", error);
    res.status(500).json({
      success: false,
      message: "Error sending student report",
      error: error.message,
    });
  }
};

const generateVolunteerExcelReport = async (filePath) => {
  try {
    const volunteers = await Volunteer.find();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Volunteers");

    // Define columns
    worksheet.columns = [
      { header: "Full Name", key: "fullName", width: 20 },
      { header: "Enrollment No", key: "enrollmentNo", width: 15 },
      { header: "Email", key: "email", width: 25 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Contact No", key: "contactNumber", width: 15 },
      { header: "Year", key: "year", width: 10 },
      { header: "Department", key: "department", width: 20 },
    ];

    // Add rows
    volunteers.forEach((volunteer) => {
      worksheet.addRow({
        fullName: volunteer.fullName,
        enrollmentNo: volunteer.enrollmentNo,
        email: volunteer.email,
        gender: volunteer.gender,
        contactNumber: volunteer.contactNumber,
        year: volunteer.year,
        department: volunteer.department,
      });
    });

    // Save file
    await workbook.xlsx.writeFile(filePath);
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

    // Delete the file after sending
    fs.unlinkSync(filePath);

    res
      .status(200)
      .json({ success: true, message: "Volunteer report sent successfully" });
  } catch (error) {
    console.error("Error sending volunteer report:", error);
    res.status(500).json({
      success: false,
      message: "Error sending volunteer report",
      error: error.message,
    });
  }
};

const handleSendVolunteerReportEmailPDF = async (req, res) => {
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
    res.status(500).json({
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
      doc
        .fontSize(12)
        .text(`Total Volunteers: ${volunteers.length}`)
        .moveDown(2);

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
            `${(index + 1).toString().padEnd(5)} ${volunteer.fullName.padEnd(
              20
            )} ${volunteer.email.padEnd(25)} ${volunteer.contactNumber.padEnd(
              15
            )} ${volunteer.enrollmentNo.padEnd(15)} ${volunteer.gender.padEnd(
              8
            )} ${volunteer.year.padEnd(6)} ${volunteer.department}`,
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

const generateAlumniExcelReport = async (filePath) => {
  try {
    const alumni = await Alumni.find();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Alumni");

    // Define columns
    worksheet.columns = [
      { header: "Full Name", key: "fullName", width: 20 },
      { header: "Enrollment No", key: "enrollmentNo", width: 15 },
      { header: "Email", key: "email", width: 25 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Contact No", key: "contactNumber", width: 15 },
      { header: "graduationYear", key: "graduationYear", width: 10 },
      { header: "Department", key: "department", width: 20 },
    ];

    // Add rows
    alumni.forEach((alumni) => {
      worksheet.addRow({
        fullName: alumni.fullName,
        enrollmentNo: alumni.enrollmentNo,
        email: alumni.email,
        gender: alumni.gender,
        contactNumber: alumni.contactNumber,
        graduationYear: alumni.graduationYear,
        department: alumni.department,
      });
    });

    // Save file
    await workbook.xlsx.writeFile(filePath);
  } catch (error) {
    throw new Error("Error generating volunteer report: " + error.message);
  }
};

const handleSendAlumniReportEmailEXCEL = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const filePath = path.join(__dirname, `alumni_report_${Date.now()}.xlsx`);
    await generateAlumniExcelReport(filePath);
    await sendAlumniReportEmailEXCEL(admin.email, admin.fullName, filePath);

    // Delete the file after sending
    fs.unlinkSync(filePath);

    res
      .status(200)
      .json({ success: true, message: "Alumni report sent successfully" });
  } catch (error) {
    console.error("Error sending alumni report:", error);
    res.status(500).json({
      success: false,
      message: "Error sending alumni report",
      error: error.message,
    });
  }
};
const handleSendAlumniReportEmailPDF = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    // Fetch alumni from the correct collection
    const alumnus = await Alumni.find(
      {},
      "fullName email contactNumber enrollmentNo gender graduationYear department"
    );
    // Generate PDF
    const pdfPath = path.join(__dirname, `alumni_report_${Date.now()}.pdf`);
    await generateAlumniReportPDF(pdfPath, admin.fullName, alumnus);
    // Send Email with PDF attachment
    await sendAlumniReportEmailPDF(admin.email, admin.fullName, pdfPath);
    // Delete the PDF after sending
    fs.unlinkSync(pdfPath);
    res.status(200).json({
      success: true,
      message: "Alumni report sent successfully",
    });
  } catch (error) {
    console.error("Error sending Alumni report:", error);
    res.status(500).json({
      success: false,
      message: "Error sending Alumni report",
      error: error.message,
    });
  }
};

const generateAlumniReportPDF = async (pdfPath, adminName, alumnus) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 30 });
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);
      // Title
      doc.fontSize(18).text("ICCHE Alumni Report", { align: "center" }).moveDown(2);
      doc.fontSize(14).text(`Admin: ${adminName}`).moveDown();
      doc.fontSize(12).text(`Total Alumni: ${alumnus.length}`).moveDown(2);
      // Table Headers
      doc
        .fontSize(12)
        .text(
          "S.No   Full Name           Email              Contact No       Enrollment No   Gender  Graduation Year  Department",
          { underline: true }
        );
      doc.moveDown(0.5);
      // Helper function to handle undefined values
      const safePad = (value, length) => (value ? value.toString().padEnd(length) : "".padEnd(length));
      // Alumni Data Table
      alumnus.forEach((alumni, index) => {
        doc
          .fontSize(10)
          .text(
            `${(index + 1).toString().padEnd(5)} ${safePad(alumni.fullName, 20)} ${safePad(alumni.email, 25)} ${safePad(alumni.contactNumber, 15)} ${safePad(alumni.enrollmentNo, 15)} ${safePad(alumni.gender, 8)} ${safePad(alumni.graduationYear, 6)} ${safePad(alumni.department, 15)}`,
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
  handleSendAlumniReportEmailEXCEL,
  handleSendAlumniReportEmailPDF,
};
