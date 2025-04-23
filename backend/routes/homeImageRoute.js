const express = require("express");
const router = express.Router();
const cache = require('../middleware/redisMidlleware');
const { getHomePageImage } = require("../controllers/homePageImageController");


router.get('/',cache(600),getHomePageImage);


module.exports = router;