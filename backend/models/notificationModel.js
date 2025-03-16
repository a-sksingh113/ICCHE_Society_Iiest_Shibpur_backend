const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pdfFile:{
        type: String,
    },
    imageFile: {
      type: String, // Store image URL or path
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
