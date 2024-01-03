const mongoose = require('mongoose')

const medicalHistorySchema = mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        },
        status: {
            type: String
        },
        date: {
            type: Date
        },
        description: {
            type: String
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('medicalHistory', medicalHistorySchema);