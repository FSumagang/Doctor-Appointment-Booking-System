const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        refreshToken: {
            type: String
        },
        roles: {
            type: [{
                type: String,
                enum: ['patient', 'assistant', 'doctor', 'admin']
            }],
            default: ['patient']
        },
        profile: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('User', userSchema);