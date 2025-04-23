const express = require("express");
const {
  getAllFarewell,
  getFarewellById,
} = require("../controllers/farewellController");
const cache = require('../middleware/redisMidlleware');
const router = express.Router();
router.get("/farewells",cache(600), getAllFarewell);
router.get("/farewells/:id", getFarewellById);

module.exports = router;
