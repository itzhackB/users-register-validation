const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    id: {
        type: String,
        required:true
    },
    birthDay: {
        type: Date,
        required:true
    },
    email: {
        type: String,
        required:true
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;