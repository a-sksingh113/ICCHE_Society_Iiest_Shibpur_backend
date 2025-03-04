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
    studentClass: {
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
        type: String,
        validate: {
            validator: function (value) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(value);
            },
            message: "Cover image must be a valid image URL"
        }
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
