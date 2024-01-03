const mongoose = require('mongoose')

const assistantSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        roles: {
            type: String,
            default: "assistant"
        }
    },

);


module.exports = mongoose.model('Assistant', assistantSchema);