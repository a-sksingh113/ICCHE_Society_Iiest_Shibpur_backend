const mongoose = require('mongoose');
const programSchema = new mongoose.Schema({
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    },
title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    coverImageURL: {
        type: String,
        required: true
    },
    videos: [{
        type: String // Stores multiple video URLs
    }],
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    winners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);
