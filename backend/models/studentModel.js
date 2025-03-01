const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    uniqueId:{
        type: String,
        required: true,
        trim: true,
        unique:[true, "Already exists"]
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    class: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    address: {
        type: String,
        required: true,
        trim : true
    },
    coverImageURL: {
        type: String 
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
