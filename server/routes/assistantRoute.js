const express = require("express");
const verifyRoles = require('../middleware/verifyRoles')

const { getAllAssistants, createNewAssistant } = require("../controllers/assistantController");

const adminDoctorOnly = verifyRoles('admin', 'doctor')

const router = express.Router();


router.get("/getAssistantsByDoctor/:id", getAllAssistants)
router.post("/createNewAssistant", createNewAssistant)


module.exports = router;