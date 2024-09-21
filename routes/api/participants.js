const express = require("express");
const router = express.Router();
const { addParticipant } = require("../../controllers/participants");

router.post("/events/:id/participants", addParticipant);

module.exports = router;
