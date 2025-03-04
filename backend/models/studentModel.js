const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: {
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
        default: "/uploads/default.png", 
        validate: {
            validator: function (value) {
                return value.startsWith("http") || value.startsWith("/uploads/"); 
            },
            message: "Cover image must be a valid image URL"
        }
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
