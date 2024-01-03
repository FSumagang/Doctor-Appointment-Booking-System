const Doctor = require('../models/doctorModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')




//delete all users
const getDoctorById = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id) {
        return res.status(400).json({message: 'Doctor ID is required'})
    }

    const user = await Doctor.findById(id).exec()

    res.json(user)
})


module.exports = {
    getDoctorById
}