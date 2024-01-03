const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema(
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
        name: {
            type: String
        },
        specialization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Specialization'
        },
        roles: {
            type: String,
            default: "doctor"
        }
    },

);


module.exports = mongoose.model('Doctor', doctorSchema);