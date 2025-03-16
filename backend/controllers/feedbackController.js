const Feedback = require("../models/feedbackModel");
const handleAddFeedback = async (req, res) => {
    try {
      const { fullName, email, contact, message } = req.body;
  
      // Validate input
      if (!fullName || !email || !contact || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Create new feedback entry
      const newFeedback = new Feedback({ fullName, email, contact, message });
      await newFeedback.save();
  
      res.status(201).json({ success: true, message: "Feedback submitted successfully!" });
    } catch (error) {
      console.error("Error adding feedback:", error);
      res.status(500).json({ error: "Server error. Please try again later." });
    }
  };


  const getPublicFeedback = async (req, res) => {
    try {
      const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Get latest first
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      res.status(500).json({ error: "Server error. Please try again later." });
    }
  };
  module.exports = {
    handleAddFeedback,
    getPublicFeedback,
  }