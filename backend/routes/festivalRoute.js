const express = require("express");
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const { getAllFestivals, getFestivalById, handleAddFestival, handleUpdateFestival, handleDeleteFestival } = require("../controllers/festivalController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");
const router = express.Router();

router.get("/festivals", getAllFestivals);
router.get("/festivals/:id", getFestivalById);
router.post(
  "/festivals/add-festival",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 }, // Single cover image
    { name: "photos", maxCount: 2 }, // Up to 10 photos
    { name: "videos", maxCount: 2}, // Up to 5 videos
  ]),
  handleAddFestival
);
router.put(
  "/festivals/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateFestival
);
router.delete(
  "/festivals/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteFestival
);

module.exports = router;
