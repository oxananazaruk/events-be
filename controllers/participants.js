const { Event } = require("../models/event");
const { Participant } = require("../models/participant");
const { ctrlWrapper } = require("../helpers");

const getEventParticipants = async (req, res) => {
  const eventId = req.params.id;

  const event = await Event.findById(eventId).populate("participants");

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (!event.participants) {
    return res.status(404).json({ message: "Participants not found" });
  }

  res.json(event.participants);
};

const addParticipant = async (req, res) => {
  const eventId = req.params.id;
  const { fullName, email, dateOfBirth, source } = req.body;

  const event = await Event.findById(eventId).populate("participants");

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const existingParticipant = event.participants?.find(
    (participant) => participant.email === email
  );

  if (existingParticipant) {
    return res.status(400).json({
      message: "Participant with this email already exists in the event",
    });
  }

  const newParticipant = new Participant({
    fullName,
    email,
    dateOfBirth,
    source,
  });
  await newParticipant.save();

  const updatedEvent = await Event.findByIdAndUpdate(
    eventId,
    { $push: { participants: newParticipant._id } },
    { new: true }
  ).populate("participants");

  if (!updatedEvent) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json(updatedEvent);
};

module.exports = {
  getEventParticipants: ctrlWrapper(getEventParticipants),
  addParticipant: ctrlWrapper(addParticipant),
};
