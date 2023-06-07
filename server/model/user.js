const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    image: {
        type: String,
        default:''
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    designation: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''
    },
    skills: {
        type: String,
        default: false
    },
    experience: {
        type: String,
        default: false
    },
    education: {
        type: String,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
