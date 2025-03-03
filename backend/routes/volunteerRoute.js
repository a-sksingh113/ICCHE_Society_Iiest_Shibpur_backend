const express = require("express");
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const { getAllVolunteer, getVolunteerById, handleAddVolunteer, handleUpdateVolunteer, handleDeleteVolunteer } = require("../controllers/volunteerController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");

router.get("/", getAllVolunteer);
router.get("/:id", getVolunteerById);
router.post(
  "/add-volunteers",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleAddVolunteer
);
router.put(
  "/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleUpdateVolunteer
);
router.delete(
  "/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteVolunteer
);

const router = express.Router();
