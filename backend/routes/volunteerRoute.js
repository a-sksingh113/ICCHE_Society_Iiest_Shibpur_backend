const express = require("express");
const { getAllVolunteer, getVolunteerById, } = require("../controllers/volunteerController");
const router = express.Router();
router.get("/", getAllVolunteer);
router.get("/:id", getVolunteerById);
module.exports = router;
