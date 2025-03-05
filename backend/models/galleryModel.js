const mongoose = require('mongoose');
const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Gallery title is required"],
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
                message: "Gallery images must be valid image URLs"
            }
        }
    ],
},{timestamps:true});
const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = Gallery;
