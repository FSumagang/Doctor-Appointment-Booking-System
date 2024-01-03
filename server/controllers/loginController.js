const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()



//login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password){
        return res.status(400).json({ status: 'error', message: 'Incorrect parameters' });
    }

    const user = await User.findOne({ email })

    if(!user){
        return res.status(401).json({ status: 'error', message: 'User does not exist.' });
    }

    if (!bcrypt.compareSync(password, user.password)){
        return res.status(401).json({ status: 'error', message: 'Incorrect Password' });
    }

    const roles = Object.values(user.roles).filter(Boolean)

    const accessToken = jwt.sign(
        { 
            "UserInfo": {
                "userId": user._id,
                "roles": roles 
            } 
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
        )

    const refreshToken = jwt.sign(
        {"userId": user._id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1h' }
    )

    user.refreshToken = refreshToken
    await user.save()

    res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000})

    return res.json({status: 200, roles, accessToken})

})

module.exports = {
    loginUser
}