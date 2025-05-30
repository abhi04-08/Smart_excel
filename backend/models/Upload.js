const mongoose = require('mongoose');
const uploadSchema = new mongoose.Schema({
    originalname: String,
    filename: String,
    path: String,
    mimetype: String,
    size: Number
}, {timestamps:true});

module.exports = mongoose.model('Upload', uploadSchema);