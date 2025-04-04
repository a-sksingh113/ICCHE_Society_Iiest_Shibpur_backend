const mongoose = require('mongoose');
const inductionGallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "festivalGallery title is required"],
        trim: true
    },
    videos: [{
        type: String, 
        validate: {
            validator: function (value) {
                return /^https?:\/\/.+\.(mp4|mov|avi|mkv|webm)$/i.test(value);
            },
            message: "Videos must be valid video URLs"
        }
    }],
    photos: [
        {
            type: String,
            validate: {
                validator: function (value) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(value);
                },
                message: "inductionGallery images must be valid image URLs"
            }
        }
    ],
},{timestamps:true});
const InductionGallery = mongoose.model("InductionGallery", inductionGallerySchema);
module.exports = InductionGallery;
