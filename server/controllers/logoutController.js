const User = require('../models/User')


const handleLogout = async (req, res) => {
    //on-client delete also accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = User.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    }
    //delete refreshToken in DB
    foundUser.refreshToken = ''
    await foundUser.save()

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.send(204)

}

module.exports = { handleLogout }