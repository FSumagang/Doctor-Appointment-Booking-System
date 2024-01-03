const express = require('express')
const Doctor = require("../models/doctorModel.js")
const bcrypt = require('bcrypt')

const router = express.Router()

//add doctor
router.post('/create', async (request, response) => {
    try {
      if (!request.body.email) {
        return response.status(400).send({
          message: 'Send all required field!'
        });
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(request.body.password, salt);

      const newUser = {
        email: request.body.email,
        password: hashedPassword,
        name: request.body.name,
        specialization: request.body.specialization
      };
  
      const existingUser = await Doctor.findOne({ email: newUser.email });
      if (existingUser) {
        return response.status(409).send({
          message: 'Document already exists!'
        });
      }
  
      await Doctor.updateOne({ 
        email: request.body.email,
        password: hashedPassword,
        name: request.body.name,
        specialization: request.body.specialization
      }, newUser, { upsert: true });
      return response.status(201).send(newUser);
    } catch (error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
});

//route for Get all users
router.get('/',  async (request, response) => {
  try {
      const user = await Doctor.find({});
      return response.status(200).json(user);
  }
  catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
  }
});

//route for Get user w/ specific id
router.get('/:id',  async (request, response) => {
  try {

      const { id } = request.params;

      const user = await Doctor.findById(id);
      return response.status(200).json(user);
  }
  catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
  }
});

// //book a certain doctor
// router.get('/book/:id',  async (request, response) => {
//   try {

//       const { id } = request.params;

//       const doctor = await Doctor.findById(id);
//       return response.status(200).json(doctor);
//   }
//   catch (error) {
//       console.log(error.message);
//       response.status(500).send({message: error.message});
//   }
// });


module.exports = router   