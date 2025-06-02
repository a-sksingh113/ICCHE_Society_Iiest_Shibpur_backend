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
    imageFile:[
      {
          type: String,
          validate: {
              validator: function (value) {
                  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(value);
              },
              message: "Gallery images must be valid image URLs"
          }
       
  
  }
],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
