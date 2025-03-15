const Student = require("../models/studentModel");
const handleAddStudents = async (req, res) => {
    try {
      const { fullName, uniqueId, gender, studentClass, address } = req.body;
      const coverImageURL = req.files["coverImageURL"] ? req.files["coverImageURL"][0].path : "/uploads/default.png";
      if (!fullName || !uniqueId || !gender || !studentClass || !address) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const existingStudent = await Student.findOne({ uniqueId });
      if (existingStudent) {
        return res.status(400).json({ message: "Student with this Unique ID already exists" });
      }
      const newStudent = new Student({
        fullName,
        uniqueId,
        gender,
        studentClass,
        address,
        coverImageURL,
      });
      await newStudent.save();
      res.status(201).json({success:"true", message: "Student added successfully", student: newStudent });
    } catch (error) {
      res.status(500).json({ message: "Failed to add student", error: error.message });
    }
  };
  const handleUpdateStudent = async (req, res) => {
    try {
      const {studentClass, address } = req.body;
  
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      student.studentClass = studentClass || student.studentClass;
      student.address = address || student.address;
      // Update cover image if provided
      if (req.file) {
        student.coverImageURL = req.file.path;
      }
      await student.save();
      res.status(200).json({ message: "Student updated successfully", student });
    } catch (error) {
      res.status(500).json({ message: "Failed to update student", error: error.message });
    }
  };
  const handleDeleteStudent = async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      await Student.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete student", error: error.message });
    }
  };

  const getAllStudents = async (req, res) => {
    try {
        const { fullName, uniqueId } = req.query;
        let filter = {};
       // GET /api/students?name=Rahul
        if (fullName) {
            filter.fullName = { $regex: fullName, $options: "i" }; // Case-insensitive partial match
        }
        //GET /api/students?uniqueId=12345
        if (uniqueId) {
            filter.uniqueId = uniqueId; // Exact match
        }
        //GET /api/students?name=Rahul&uniqueId=12345
        const students = await Student.find(filter);
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve students", error: error.message });
    }
};

  const getStudentById = async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve student", error: error.message });
    }
  };

  module.exports = {
    handleAddStudents,
    handleUpdateStudent,
    handleDeleteStudent,
    getAllStudents,
    getStudentById
  }