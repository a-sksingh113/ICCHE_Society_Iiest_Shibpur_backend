const express = require("express");
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const { getAllAlumni, getAlumniById, handleAddAlumni, handleUpdateAlumni, handleDeleteAlumni } = require("../controllers/alumniController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");
const router = express.Router();
router.get("/", getAllAlumni);
router.get("/:id", getAlumniById);
router.post(
  "/add-alumni",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleAddAlumni
);
router.put(
  "/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleUpdateAlumni
);
router.delete(
  "/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteAlumni
);
module.exports = router;
