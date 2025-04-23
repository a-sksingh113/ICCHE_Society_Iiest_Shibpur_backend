const express = require("express");
const { getNotifications } = require("../controllers/notificationController");
const cache = require('../middleware/redisMidlleware');
const router = express.Router();


router.get("/",cache(600), getNotifications);

module.exports = router;
