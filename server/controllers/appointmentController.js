
const Appointment = require("../models/appointmentModel")
const User = require("../models/User")
const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.create = async (req, res) => {
    //incoming user data
    console.log(req.body);

    const { description, appointmentTime, doctor, appointmentDate } = req.body;

    const cookies = req.cookies;
    const token = cookies.jwt;
    
    const foundUser = await User.findOne({ refreshToken: token });

        if (!foundUser) {
            return res.status(401).json({
                errorMessage: "User not authenticated",
            });
        }



    try {


        const appointment = await Appointment.findOne({ appointmentTime, appointmentDate, doctor })
        if (appointment) {
            return res.status(400).json({
                errorMessage: "appointment already exists",
            });
        }


        const newAppointment = new Appointment();

        newAppointment.description = description
        newAppointment.appointmentTime = appointmentTime;
        newAppointment.appointmentDate = appointmentDate;
        newAppointment.doctor = doctor;
        newAppointment.appointmentOwner = foundUser._id;



        await newAppointment.save();



    } catch (err) {
        console.log("schedule error: ", err);
        res.status(500).json({
            errorMessage: "Server error",
        });
    }
}


exports.getAll = async (req, res) => {
    const userId = req.params.userId
    console.log(userId);
    try {
        const appointments = await Appointment.find({})
            .populate("doctor", "name")

            .exec()
        console.log("current available appointments", appointments)

        res.json({ appointments });
    } catch (err) {
        console.log(err, 'appointments.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};


exports.list = async (req, res) => {
    const cookies = req.cookies;
    const token = cookies.jwt;
  
    User.findOne({ refreshToken: token }).then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({ errorMessage: "User not found" });
      }
  
      const userId = foundUser._id;
      Appointment.find({ appointmentOwner: userId })
        .sort({ appointmentDate: 1 })
        .populate("doctor", "name")
        .then((appointments) => {
          console.log("current available appointments", appointments);
          res.json({ appointments });
        })
        .catch((err) => {
          console.error(err, "appointments.readAll error");
          res.status(500).json({ errorMessage: "Please try again later" });
        });
    });
  };
  

exports.listByDoctor = async (req, res) => {


    try {
        const appointments = await Appointment.find({ doctor: req.params.doctorId }).sort({ appointmentDate: 1 })
            .populate("doctor", "name")
            .populate("appointmentOwner", "username")
            .exec()
        console.log("current available appointments", appointments)

        res.json({ appointments });
    } catch (err) {
        console.log(err, 'appointments.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};


exports.read = async (req, res) => {

    /*   try {
         const specialization = await Appointment.findById(req.params.specializationId)
 
         res.json({ specialization });
     } catch (err) {
         console.log(err, 'specializationController.readAll error');
         res.status(500).json({
             errorMessage: 'Please try again later',
         });
     }   */
};



exports.update = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, req.body)

        res.json({ successMessage: `appointment was successfully edited` });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.confirm = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const filter = { _id: appointmentId };
        const update = { appointmentStatus: "Confirmed" };
        const appointment = await Appointment.findOneAndUpdate(filter, update, {
            new: true
        });

        res.json({ successMessage: ` appointment was successfully edited`, appointment });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.attended = async (req, res) => {

    try {
        const appointmentId = req.params.appointmentId;
        const filter = { _id: appointmentId };
        const update = { appointmentStatus: "Attended" };
        const appointment = await Appointment.findOneAndUpdate(filter, update, {
            new: true
        });

        res.json({ successMessage: ` appointment was successfully edited`, appointment });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.cancelled = async (req, res) => {

    try {
        const appointmentId = req.params.appointmentId;
        const filter = { _id: appointmentId };
        const update = { appointmentStatus: "Cancelled" };
        const appointment = await Appointment.findOneAndUpdate(filter, update, {
            new: true
        });

        res.json({ successMessage: ` appointment was successfully edited`, appointment });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.remove = async (req, res) => {

    //when the user cancels we can actually just update the appointmentStatus to Cancelled
    //use this link for ref https://www.mongodb.com/docs/manual/tutorial/expire-data/
    try {
        const appointmentId = req.params.appointmentId;
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId)

        res.json({ deletedAppointment });
    } catch (err) {
        console.log(err, 'deletedAppointment.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};