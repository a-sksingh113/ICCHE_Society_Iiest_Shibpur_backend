const express = require("express");
const { getAllActivities,  getAllPrograms, getProgramById} = require("../controllers/activitiesController");
const router = express.Router();

//for activity like sports day, drawing competetion
router.get("/activities", getAllActivities);
router.get("/activities/:id", getActivityById);
// for programs in activity like tug of war, musical chair in sports day
router.get("/activities/:id/programs", getAllPrograms);
router.get("/activities/:id/programs/:id", getProgramById);

module.exports = router;
