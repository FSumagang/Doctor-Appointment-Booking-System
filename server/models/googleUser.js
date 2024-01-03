const mongoose = require('mongoose');


const googleUserSchema = mongoose.Schema(
    {
        googleId: {
            type: String,
            unique: true,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String
        },
        roles: {
            type: [{
                type: String,
                enum: ['patient', 'assistant', 'doctor', 'admin']
            }],
            default: ['patient']
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('googleUser', googleUserSchema);