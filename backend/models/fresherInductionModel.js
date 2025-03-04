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
        required: true
    },
    venue: {
        type: String,
        required: true,
        trim: true
    },
    coverImageURL: {
        type: String, 
    },
    photos: [{
        type: String // Stores multiple image URLs
    }],
    videos: [{
        type: String // Stores multiple video URLs
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
