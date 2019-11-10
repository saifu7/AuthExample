const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        index: true
    },
    role: {
        type: Boolean,
        default: false
    },
    profilePic: String,
    password: { type: String, required: true }
}, { timestamps: true });


userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

module.exports = mongoose.model('User', userSchema);