const mongoose = require('mongoose');


const appointmentSchema = mongoose.Schema(
    {
        appointmentOwner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Doctor'
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Cancelled'],
            default: "Pending"
        },
        appointmentTime: {
            type: String
        },
        appointmentDate: {
            type: String
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('Appointment', appointmentSchema);