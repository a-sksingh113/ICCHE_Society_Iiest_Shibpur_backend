const mongoose = require('mongoose');

const clothDonationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: [10, "Description must be at least 10 characters"]
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: "Donation date cannot be in the past"
        }
    },
    location: {
     type:String,
     required:true
    },
        studentsReceived: {
            type: Number,
            default: 0,
            min: [0, "Students received cannot be negative"]
        },
        volunteerPresent: {
            type: Number,
            default: 0,
            min: [0, "volunteer present cannot be negative"]
        },
        parentsReceived: {
            type: Number,
            default: 0,
            min: [0, "Parents received cannot be negative"]
        }
    ,
    videos: [{
        type: String, 
        validate: {
            validator: function (value) {
                return /^https?:\/\/.+\.(mp4|mov|avi|mkv|webm)$/i.test(value);
            },
            message: "Videos must be valid video URLs"
        }
    }],
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
}, { timestamps: true });

module.exports = mongoose.model('ClothDonation', clothDonationSchema);
