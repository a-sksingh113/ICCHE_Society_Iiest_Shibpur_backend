const express = require("express");
const { getAllClassrooms, getClassroomById } = require("../controllers/classroomController");
const cache = require('../middleware/redisMidlleware');
const router = express.Router();
router.get("/",cache(600),getAllClassrooms);
router.get("/:id", getClassroomById);
module.exports = router;
