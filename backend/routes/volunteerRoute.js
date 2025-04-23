const express = require("express");
const { getAllVolunteer, getVolunteerById, } = require("../controllers/volunteerController");
const cache = require('../middleware/redisMidlleware');
const router = express.Router();
router.get("/", cache(600),getAllVolunteer);
router.get("/:id", getVolunteerById);
module.exports = router;
