
const Classroom = require("../models/classroomModel");


const createClassroom = async (req, res) => {
  try {
    const { day,date, volunteersPresent, studentsPresent } = req.body;
    const coverImageURL = req.file ? req.file.path : "/uploads/default.png";

    const newClassroom = new Classroom({
      day,
      date,
      volunteersPresent,
      studentsPresent,
      coverImageURL,
    });

    await newClassroom.save();
    res.status(201).json({ success: true, message: "Classroom created", data: newClassroom });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating classroom", error: error.message });
  }
};

const getAllClassrooms = async (req, res) => {
    try {
      const classrooms = await Classroom.find()
        .sort({ createdAt: -1 }) 
        .limit(6);                
  
      res.status(200).json({ success: true, data: classrooms });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Error fetching latest classrooms", 
        error: error.message 
      });
    }
  };
  

const getClassroomById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ success: false, message: "Classroom not found" });
    }
    res.status(200).json({ success: true, data: classroom });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching classroom", error: error.message });
  }
};

const updateClassroom = async (req, res) => {
  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedClassroom) {
      return res.status(404).json({ success: false, message: "Classroom not found" });
    }
    res.status(200).json({ success: true, message: "Classroom updated", data: updatedClassroom });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating classroom", error: error.message });
  }
};

const deleteClassroom = async (req, res) => {
  try {
    const deletedClassroom = await Classroom.findByIdAndDelete(req.params.id);
    if (!deletedClassroom) {
      return res.status(404).json({ success: false, message: "Classroom not found" });
    }
    res.status(200).json({ success: true, message: "Classroom deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting classroom", error: error.message });
  }
};

module.exports = {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroom,
  deleteClassroom,
};
