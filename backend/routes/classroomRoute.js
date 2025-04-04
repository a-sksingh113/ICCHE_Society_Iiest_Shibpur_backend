const express = require("express");
const { getAllClassrooms, getClassroomById } = require("../controllers/classroomController");
const router = express.Router();
router.get("/",getAllClassrooms);
router.get("/:id", getClassroomById);
module.exports = router;
