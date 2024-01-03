const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


//get all users
//get method
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

//create all users
//post method
const createNewUser = asyncHandler(async (req, res) => {
    const {email, password, firstName, lastName, dateOfBirth, gender, address} = req.body;

    //validating data
    // if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender  || !address){
    //     return res.status(400).json({message: 'All fields are required'})
    // }

    //check for dupes
    const duplicate = await User.findOne({email}).exec()

    if (duplicate) {
        return res.status(409).json({message: 'Email already exists!'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userObject = {email, "password": hashedPassword, firstName, lastName, dateOfBirth, gender, address}

    //create and store new user
    const user = await User.create(userObject)

    if (user) {
        res.status(201).json({message: `New user ${email} created`})
    } else {
        res.status(400).json({message: 'Invalid user data received'})
    }
})

//update users
//patch method
const updateUser = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, dateOfBirth, gender , address } = req.body;

    //validate data
    if (!email || !firstName || !lastName || !dateOfBirth || !gender || !address){
        return res.status(400).json({message: 'All fields are required'})
    }

    const user = await User.findById(email).exec()

    if (!user) {
        res.status(400).json({message: 'User not found'})
    }

    //check for dupes
    const duplicate = await User.findOne({email}).lean().exec()
    //allow updates to orig user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate user'})
    }

    user.email = email
    user.firstName = firstName
    user.lastName = lastName
    user.dateOfBirth = dateOfBirth
    user.gender = gender
    user.address = address

    if (password){
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({message: `${updatedUser.email} updated`})
})  

//delete all users
const deleteUser = asyncHandler(async (req, res) => {
    const {email} = req.body

    if(!email) {
        return res.status(400).json({message: 'User email required'})
    }

    const user = await User.findById(email).exec()

    if (!user) {
        return res.status(400).json({message: 'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.email} with ID ${result._id} deleted`

    res.json(reply)
})


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
}