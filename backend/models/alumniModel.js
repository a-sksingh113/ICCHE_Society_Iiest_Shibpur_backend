const mongoose = require('mongoose');
const alumniSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },
    enrollmentNo:{
        type:String,
        required:true,
        unique:true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    coverImageURL: {
        type: String // Store image URL or file path
    }
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);
