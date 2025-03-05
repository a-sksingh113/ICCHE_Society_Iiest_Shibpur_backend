const express = require("express");
const {
  getAllFarewell,
  getFarewellById,
} = require("../controllers/farewellController");
const router = express.Router();
router.get("/farewells", getAllFarewell);
router.get("/farewells/:id", getFarewellById);

module.exports = router;
