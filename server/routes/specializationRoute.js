
const express = require("express");
const { create, list, read, update,
  remove } = require("../controllers/specializationController")
const verifyRoles = require('../middleware/verifyRoles')
const router = express.Router();



router.post("/create", create)
router.get("/list", list)
router.get("/:specializationId", read)
router.put("/:specializationId", update)
router.delete("/:specializationId", remove)

module.exports = router;