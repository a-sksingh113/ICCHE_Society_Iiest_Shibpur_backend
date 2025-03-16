const Image = require("../models/homePageImageModel");

const handleAddHomePageImage = async (req, res) => {
  try {
    const { title } = req.body;
    const coverImageURL = req.file ? req.file.path : "/uploads/default.png";

    const newImage = new Image({ title, coverImageURL });
    await newImage.save();

    res
      .status(201)
      .json({ success:"true",message: "Image added successfully!", coverImageURL: newImage });
  } catch (error) {
    console.error("Error adding homepage image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getHomePageImage = async (req, res) => {
    try {
      const images = await Image.find(); // Fetch all images from MongoDB
      res.status(200).json(images);
    } catch (error) {
      console.error("Error fetching homepage images:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = { handleAddHomePageImage,getHomePageImage  };
