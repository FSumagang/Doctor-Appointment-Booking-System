const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://medicalhospitalcare:Pajc0xG7EE7wtkQp@doctorappointmentbookin.wzmtfvh.mongodb.net/?retryWrites=true&w=majority')
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;