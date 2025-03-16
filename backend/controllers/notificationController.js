const Notification = require("../models/notificationModel");

const handleAddNotification = async (req, res) => {
    try {
      const { title, description } = req.body;
      const imageFile = req.files["imageFile"] ? req.files["imageFile"][0].path : "/uploads/default.png";
    const pdfFile = req.files["pdfFile"] ? req.files["pdfFile"][0].path : "";

     
      const newNotification = new Notification({ title, description, imageFile,pdfFile });
      await newNotification.save();
  
      res.status(201).json({ message: "Notification created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create notification" });
    }
  };

  const getNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find().sort({ createdAt: -1 });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  }

  const handleDeleteNotification = async (req, res) => {
    try {
      await Notification.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete notification" });
    }
  };
  module.exports = {
    handleAddNotification,
    getNotifications,
    handleDeleteNotification
  }