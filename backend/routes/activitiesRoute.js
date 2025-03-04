const express = require("express");
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const {} = require("../controllers/festivalController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");
const { getAllActivities, getActivityById, handleAddActivities, handleUpdateActivities, handleDeleteActivities, getAllPrograms, getProgramById, handleAddProgram, handleUpdateProgram, handleDeleteProgram } = require("../controllers/activitiesController");
const router = express.Router();

//for activity like sports day, drawing competetion
router.get("/activities", getAllActivities);
router.get("/activities/:id", getActivityById);
router.post(
  "/activities/add-activities",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleAddActivities
);
router.put(
  "/activities/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateActivities
);
router.delete(
  "/activities/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteActivities
);

// for programs in activity like tug of war, musical chair in sports day
router.get("/activities/:id/programs", getAllPrograms);
router.get("/activities/:id/programs/:id", getProgramById);
router.post(
  "/activities/:id/programs/add-programs",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleAddProgram
);
router.put(
  "/activities/:id/programs/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateProgram
);
router.delete(
  "/activities/:id/programs/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteProgram
);

module.exports = router;
