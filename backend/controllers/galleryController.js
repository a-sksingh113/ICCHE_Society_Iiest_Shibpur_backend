const Gallery = require("../models/galleryModel");
const FestivalGallery = require("../models/festivalGalleryModel");
const DonationGallery = require('../models/donationGalleryModel')
const ActivityGallery = require("../models/activitiesGalleryModel")
const InductionGallery = require("../models/inductionGalleryModel")
const FarewellGallery = require("../models/farewellGalleryModel")
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



// 🌟 FESTIVAL
const handleAddFestivalPhotos = async (req, res) => {
  try {
    const { title } = req.body;
    const photos = req.file ? req.file.path : "/uploads/default.png";
    const newEntry = new FestivalGallery({ title, photos });
    await newEntry.save();
    res.status(201).json({ success: true, message: "Festival photo added", data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding festival photo", error });
  }
};

const handleAddFestivalVideos = async (req, res) => {
  try {
    const { title } = req.body;
    const videos = req.file ? req.file.path : "/uploads/default.png";
    const newEntry = new FestivalGallery({ title, videos});
    await newEntry.save();
    res.status(201).json({ success: true, message: "Festival video added", data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding festival video", error });
  }
};

// 🌟 ACTIVITIES
const handleAddActivitiesPhotos = async (req, res) => {
  try {
    const { title } = req.body;
    const photos = req.file ? req.file.path : "/uploads/default.png";
    const newEntry = new ActivityGallery({ title, photos});
    await newEntry.save();
    res.status(201).json({ success: true, message: "Activities photo added", data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding activities photo", error });
  }
};

const handleAddActivitiesVideos = async (req, res) => {
  try {
    const { title } = req.body;
    const videos = req.file ? req.file.path : "/uploads/default.png";
    const newEntry = new ActivityGallery({ title, videos});
    await newEntry.save();
    res.status(201).json({ success: true, message: "Activities video added", data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding activities video", error });
  }
};

// 🌟 INDUCTION
const handleAddInductionPhotos = async (req, res) => {
  try {
    const { title } = req.body;
    const photos = req.file ? req.file.path : "/uploads/default.png";
    const newEntry = new InductionGallery({ title, photos });
    await newEntry.save();
    res.status(201).json({ success: true, message: "Induction photo added", data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding induction photo", error });
  }
};

const handleAddInductionVideos = async (req, res) => {
  try {
    const { title } = req.body;
    const videos = req.file ? req.file.path : "/uploads/default.png";
    const newEntry = new InductionGallery({ title, videos });
    await newEntry.save();
    res.status(201).json({ success: true, message: "Induction video added", data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding induction video", error });
  }
};

// 🌟 FAREWELL
const handleAddFarewellPhotos = async (req, res) => {
  try {
    const { title } = req.body;
    const photos = req.file ? req.file.path : "/uploads/default.png";
    const newEntry = new FarewellGallery({ title, photos });
    await newEntry.save();
    res.status(201).json({ success: true, message: "Farewell photo added", data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding farewell photo", error });
  }
};

const handleAddFarewellVideos = async (req, res) => {
  try {
    const { title } = req.body;
    const videos = req.file ? req.file.path : "/uploads/default.png";
    const newEntry = new FarewellGallery({ title, videos});
    await newEntry.save();
    res.status(201).json({ success: true, message: "Farewell video added", data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding farewell video", error });
  }
};

// 🌟 DONATION
const handleAddDonationPhotos = async (req, res) => {
  try {
    const { title } = req.body;
    const photos = req.file ? req.file.path : "/uploads/default.png";
    const newEntry = new DonationGallery({ title, photos });
    await newEntry.save();
    res.status(201).json({ success: true, message: "Donation photo added", data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding donation photo", error });
  }
};

const handleAddDonationVideos = async (req, res) => {
  try {
    const { title } = req.body;
    const videos = req.file ? req.file.path : "/uploads/default.png";
    const newEntry = new DonationGallery({ title, videos});
    await newEntry.save();
    res.status(201).json({ success: true, message: "Donation video added", data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding donation video", error });
  }
};

//get function 
const getFestivalPhotos = async (req, res) => {
  try {
    const photos = await FestivalGallery.find({ photos: { $exists: true } });
    res.status(200).json({ success: true, data: photos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching festival photos", error });
  }
};

const getFestivalVideos = async (req, res) => {
  try {
    const videos = await FestivalGallery.find({ videos: { $exists: true } });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching festival videos", error });
  }
};

const getActivitiesPhotos = async (req, res) => {
  try {
    const photos = await ActivityGallery.find({ photos: { $exists: true } });
    res.status(200).json({ success: true, data: photos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching activities photos", error });
  }
};

const getActivitiesVideos = async (req, res) => {
  try {
    const videos = await ActivityGallery.find({ videos: { $exists: true } });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching activities videos", error });
  }
};


const getInductionPhotos = async (req, res) => {
  try {
    const photos = await InductionGallery.find({ photos: { $exists: true } });
    res.status(200).json({ success: true, data: photos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching induction photos", error });
  }
};

const getInductionVideos = async (req, res) => {
  try {
    const videos = await InductionGallery.find({ videos: { $exists: true } });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching induction videos", error });
  }
};

const getFarewellPhotos = async (req, res) => {
  try {
    const photos = await FarewellGallery.find({ photos: { $exists: true } });
    res.status(200).json({ success: true, data: photos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching farewell photos", error });
  }
};

const getFarewellVideos = async (req, res) => {
  try {
    const videos = await FarewellGallery.find({ videos: { $exists: true } });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching farewell videos", error });
  }
};

const getDonationPhotos = async (req, res) => {
  try {
    const photos = await DonationGallery.find({ photos: { $exists: true } });
    res.status(200).json({ success: true, data: photos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching donation photos", error });
  }
};

const getDonationVideos = async (req, res) => {
  try {
    const videos = await DonationGallery.find({ videos: { $exists: true } });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching donation videos", error });
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
const deleteFestivalPhoto = async (req, res) => {
  try {
    await FestivalGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Festival photo deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting festival photo", error });
  }
};

const deleteFestivalVideo = async (req, res) => {
  try {
    await FestivalGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Festival video deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting festival video", error });
  }
};

const deleteActivitiesPhoto = async (req, res) => {
  try {
    await ActivityGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Activities photo deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting activities photo", error });
  }
};

const deleteActivitiesVideo = async (req, res) => {
  try {
    await ActivityGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Activities video deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting activities video", error });
  }
};
const deleteInductionPhoto = async (req, res) => {
  try {
    await InductionGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Induction photo deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting induction photo", error });
  }
};

const deleteInductionVideo = async (req, res) => {
  try {
    await InductionGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Induction video deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting induction video", error });
  }
};

const deleteFarewellPhoto = async (req, res) => {
  try {
    await FarewellGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Farewell photo deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting farewell photo", error });
  }
};

const deleteFarewellVideo = async (req, res) => {
  try {
    await FarewellGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Farewell video deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting farewell video", error });
  }
};
const deleteDonationPhoto = async (req, res) => {
  try {
    await DonationGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Donation photo deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting donation photo", error });
  }
};

const deleteDonationVideo = async (req, res) => {
  try {
    await DonationGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Donation video deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting donation video", error });
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
  handleAddFestivalPhotos,
  handleAddFestivalVideos,
  handleAddActivitiesPhotos,
  handleAddActivitiesVideos,
  handleAddInductionPhotos,
  handleAddInductionVideos,
  handleAddFarewellPhotos,
  handleAddFarewellVideos,
  handleAddDonationPhotos,
  handleAddDonationVideos,
  getFestivalPhotos,
  getFestivalVideos,
  getActivitiesPhotos,
  getActivitiesVideos,
  getInductionPhotos,
  getInductionVideos,
  getFarewellPhotos,
  getFarewellVideos,
  getDonationPhotos,
  getDonationVideos,
  deleteFestivalPhoto,
  deleteFestivalVideo,
  deleteActivitiesPhoto,
  deleteActivitiesVideo,
  deleteInductionPhoto,
  deleteInductionVideo,
  deleteFarewellPhoto,
  deleteFarewellVideo,
  deleteDonationPhoto,
  deleteDonationVideo,
};
