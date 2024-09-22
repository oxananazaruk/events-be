const { Event } = require("../models/event");
const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  console.log(req.query);
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Event.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("participants");
  res.json(result);
};

// const getEventParticipants = async (req, res) => {
//   const eventId = req.params.id;

//   const event = await Event.findById(eventId).populate("participants");

//   if (!event) {
//     return res.status(404).json({ message: "Event not found" });
//   }

//   res.json(event.participants);
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  // getEventParticipants: ctrlWrapper(getEventParticipants),
};
