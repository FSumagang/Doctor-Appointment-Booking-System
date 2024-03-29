const express = require("express");
const verifyRoles = require('../middleware/verifyRoles')

const { create, getAll, list, listByDoctor, read, confirm, update, attended, cancelled,
    remove } = require("../controllers/appointmentController");

const router = express.Router();


router.post("/create", create)
router.get("/list", getAll)
router.get("/list/:userId", list)
router.get("/all/:doctorId", listByDoctor)

router.get("/:appointmentId", read)
router.put("/confirm/:appointmentId", confirm)
router.put("/:appointmentId", update)
router.put("/attended/:appointmentId", attended)
router.put("/cancelled/:appointmentId", cancelled)
router.delete("/:appointmentId", remove)

module.exports = router;