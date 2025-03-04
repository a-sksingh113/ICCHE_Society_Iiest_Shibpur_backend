const mongoose = require('mongoose');
const fresherInductionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value <= new Date(); // Ensures the date is not in the future
            },
            message: "Date cannot be in the future"
        }
    },
    venue: {
        type: String,
        required: true,
        trim: true
    },
    coverImageURL: {
        type: String,
        default: "/uploads/default.png", 
        validate: {
            validator: function (value) {
                return value.startsWith("http") || value.startsWith("/uploads/"); 
            },
            message: "Cover image must be a valid image URL"
        }
    },
    
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
    videos: [{
        type: String, 
        validate: {
            validator: function (value) {
                return /^https?:\/\/.+\.(mp4|mov|avi|mkv|webm)$/i.test(value);
            },
            message: "Videos must be valid video URLs"
        }
    }],
    chiefGuest: {
        type: String,
        trim: true
    },
    fresherPresent: {
        type: Number,
        default: 0, // Defaults to 0 if no value is provided
        min: 0
    },
    volunteerPresent: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('FresherInduction', fresherInductionSchema);
