const Gallery = require("../models/galleryModel");
const getAllPhotosVideos = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
const getAllPhotos = async (req, res) => {
  try {
    const photos = await Gallery.find({ photos: { $exists: true, $ne: [] } });
    res.status(200).json({ success: true, data: photos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
const getPhotoById = async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);
    if (!photo)
      return res
        .status(404)
        .json({ success: false, message: "Photo not found" });

    res.status(200).json({ success: true, data: photo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Gallery.find({ videos: { $exists: true, $ne: [] } });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get a single video by ID
const getVideoById = async (req, res) => {
  try {
    const video = await Gallery.findById(req.params.id);
    if (!video)
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });

    res.status(200).json({ success: true, data: video });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Add photos
const handleAddPhotos = async (req, res) => {
  try {
    const { title} = req.body;
    const photos = req.file ? req.file.path : "/uploads/default.png";
    const newGalleryEntry = new Gallery({
      title,
      photos,
    });

    await newGalleryEntry.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Photos added successfully",
        data: newGalleryEntry,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding photos", error });
  }
};

const handleAddVideos = async (req, res) => {
  try {
    const { title} = req.body;
    const videos = req.file ? req.file.path : "/uploads/default.png";

    const newGalleryEntry = new Gallery({
      title,
      videos,
    });

    await newGalleryEntry.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Videos added successfully",
        data: newGalleryEntry,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding videos", error });
  }
};

const handleDeletePhotos = async (req, res) => {
    try {
      const { photos } = req.body; 
      if (!photos || !Array.isArray(photos) || photos.length === 0) {
        return res.status(400).json({ success: false, message: "No photos specified for deletion" });
      }
      const result = await Gallery.updateMany(
        { photos: { $in: photos } }, 
        { $pull: { photos: { $in: photos } } } 
      );
      res.status(200).json({ success: true, message: "Selected photos deleted successfully", result });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting selected photos", error });
    }
  };
  

const handleDeletePhoto = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting photo", error });
  }
};

const handleDeleteVideos = async (req, res) => {
    try {
      const { videos } = req.body; 
      if (!videos || !Array.isArray(videos) || videos.length === 0) {
        return res.status(400).json({ success: false, message: "No videos specified for deletion" });
      }
      const result = await Gallery.updateMany(
        { videos: { $in: videos } }, 
        { $pull: { videos: { $in: videos } } } 
      );
      res.status(200).json({ success: true, message: "Selected videos deleted successfully", result });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting selected videos", error });
    }
  };
  

const handleDeleteVideo = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting video", error });
  }
};

module.exports = {
  getAllPhotosVideos,
  getAllPhotos,
  getPhotoById,
  getAllVideos,
  getVideoById,
  handleAddPhotos,
  handleAddVideos,
  handleDeletePhotos,
  handleDeletePhoto,
  handleDeleteVideos,
  handleDeleteVideo,
};
