const express = require("express");
const router = express.Router();
const { getHomePageImage } = require("../controllers/homePageImageController");

router.get('/',getHomePageImage);


module.exports = router;