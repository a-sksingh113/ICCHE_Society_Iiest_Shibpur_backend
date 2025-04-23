const express = require("express");
const { getAllClothDonations, getClothDonationById } = require("../controllers/donationController");
const cache = require('../middleware/redisMidlleware');
const router = express.Router();
router.get("/cloth-donations", cache(600),getAllClothDonations);
router.get("/cloth-donations/:id", getClothDonationById);
module.exports = router;
