const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
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
    enrollmentNo: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    year: {
        type: String,
        required: true,
        min: 1,
        max: 5
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    residenceType: {
        type: String,
        enum: ['Hostel', 'Hall', 'Day Scholar'],
        required: true
    },
    hostelName: {
        type: String,
        trim: true,
        default: null 
    },
    hallName: {
        type: String,
        trim: true,
        default: null 
    },
    address: {
        type: String,
        trim: true,
        default: null 
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
    }
}, { timestamps: true });

// Ensure only one of hostelName, hallName, or address is provided
volunteerSchema.pre('save', function (next) {
    if (this.residenceType === 'Hostel' && !this.hostelName) {
        return next(new Error('Hostel name is required for Hostel residents.'));
    }
    if (this.residenceType === 'Hall' && !this.hallName) {
        return next(new Error('Hall name is required for Hall residents.'));
    }
    if (this.residenceType === 'Day Scholar' && !this.address) {
        return next(new Error('Address is required for Day Scholars.'));
    }
    next();
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
