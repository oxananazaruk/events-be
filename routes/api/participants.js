const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/participants");

router.get("/:id", ctrl.getEventParticipants);
router.post("/:id", ctrl.addParticipant);

module.exports = router;
