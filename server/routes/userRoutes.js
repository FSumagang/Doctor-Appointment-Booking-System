const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController')
const verifyRoles = require('../middleware/verifyRoles')

router.route('/')
    .get(usersController.getAllUsers) 
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);


module.exports = router