const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Festival title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Festival description is required"],
        minlength: [10, "Description must be at least 10 characters long"]
    },
    venue: {
        type: String,
        required: [true, "Festival venue is required"],
        trim: true
    },
    date: {
        type: Date,
        required: [true, "Festival date is required"],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: "Festival date must be in the past"
        }
    },
    coverImageURL: {
        type: String,
        required: [true, "Cover image is required"],
        validate: {
            validator: function (value) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(value);
            },
            message: "Cover image must be a valid image URL"
        }
    },
    videos: [{
        type: String // Stores multiple video URLs
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
        studentsPresent: {
            type: Number,
            default: 0,
            min: [0, "Students present cannot be negative"]
        },
        volunteersPresent: {
            type: Number,
            default: 0,
            min: [0, "Volunteers present cannot be negative"]
        }
    
}, { timestamps: true });

module.exports = mongoose.model('Festival', festivalSchema);
