const express = require("express");
const ctrl = require("../../controllers/events");

const router = express.Router();

router.get("/", ctrl.getAll);
// router.get("/events/:id/participants", ctrl.getEventParticipants);

module.exports = router;
