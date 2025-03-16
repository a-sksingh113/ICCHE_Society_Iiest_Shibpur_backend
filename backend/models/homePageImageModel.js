const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    title:{
        type:String,
    },
  coverImageURL:{
        type: String,
        default: "/uploads/default.png", 
        validate: {
            validator: function (value) {
                return value.startsWith("http") || value.startsWith("/uploads/"); 
            },
            message: "Image must be a valid image URL"
        }
    }
},{timestamps:true})
module.exports = mongoose.model('Image', imageSchema);