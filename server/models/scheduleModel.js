const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        date: {
            type: String
        },
        time: {
            type: Array
        },
        maxBooking: {
            type: String
        },
        minBooking: {
            type: String
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('Schedule', scheduleSchema);