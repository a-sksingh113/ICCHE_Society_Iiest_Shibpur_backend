const mongoose = require('mongoose');
const alumniSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: String,
        trim: true
    },
    enrollmentNo:{
        type:String,
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
        type: String,
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

module.exports = mongoose.model('Alumni', alumniSchema);
