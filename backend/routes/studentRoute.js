const express = require("express");
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const { getAllStudents, getStudentById, handleAddStudents, handleUpdateStudent, handleDeleteStudent } = require("../controllers/studentController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");
const router = express.Router();
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.post(
  "/add-students",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleAddStudents
);
router.put(
  "/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleUpdateStudent
);
router.delete(
  "/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteStudent
);
module.exports = router;

