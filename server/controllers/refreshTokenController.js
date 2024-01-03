const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = User.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser._id !== decoded._id) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "_id": decoded._id,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }