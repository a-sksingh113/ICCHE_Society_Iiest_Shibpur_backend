const express = require("express");
const { getAllClothDonations, getClothDonationById } = require("../controllers/donationController");
const router = express.Router();
router.get("/cloth-donations", getAllClothDonations);
router.get("/cloth-donations/:id", getClothDonationById);
module.exports = router;
