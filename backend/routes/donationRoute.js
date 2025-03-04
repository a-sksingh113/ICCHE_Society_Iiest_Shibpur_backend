const express = require("express");
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const { getAllClothDonations, getClothDonationById, handleAddClothDonation, handleUpdateClothDonation, handleDeleteClothDonation } = require("../controllers/donationController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");
const router = express.Router();

router.get("/cloth-donations", getAllClothDonations);
router.get("/cloth-donations/:id", getClothDonationById);
router.post(
  "/cloth-donations/add-cloth-donation",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleAddClothDonation
);
router.put(
  "/cloth-donations/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateClothDonation
);
router.delete(
  "/cloth-donations/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteClothDonation
);

module.exports = router;
