const express = require("express");
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const {} = require("../controllers/festivalController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");
const {} = require("../controllers/activitiesController");
const router = express.Router();

router.get("/farewells", getAllFairwell);
router.get("/farewells/:id", getFairwellById);
router.post(
  "/farewells/add-farewell",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleAddFairwell
);
router.put(
  "/farewells/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateFairwell
);
router.delete("/farewell/:id", handleDeleteFairwell);

module.exports = router;
