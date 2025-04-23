const express = require("express");
const { getAllActivities,  getAllPrograms, getProgramById, getActivityById} = require("../controllers/activitiesController");
const cache = require('../middleware/redisMidlleware');
const router = express.Router();

//for activity like sports day, drawing competetion
router.get("/activities",cache(600), getAllActivities);
router.get("/activities/:id", getActivityById);
// for programs in activity like tug of war, musical chair in sports day
router.get("/activities/:id/programs", getAllPrograms);
router.get("/activities/:id/programs/:id", getProgramById);

module.exports = router;
