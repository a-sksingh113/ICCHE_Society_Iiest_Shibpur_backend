const express = require("express");
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");
const { getAllFreshersInductions, getFreshersInductionById, handleAddFresherInduction, handleUpdateFresherInduction, handleDeleteFresherInduction } = require("../controllers/inductionController");
const router = express.Router();

router.get("/freshersInductions", getAllFreshersInductions);
router.get("/freshersInductions/:id", getFreshersInductionById);
router.post(
  "/freshersInductions/add-freshersInduction",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleAddFresherInduction
);
router.put(
  "/freshersInductions/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateFresherInduction
);
router.delete(
  "/freshersInductions/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteFresherInduction
);

module.exports = router;
