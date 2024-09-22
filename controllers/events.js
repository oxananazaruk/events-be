const { Event } = require("../models/event");
const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  console.log(req.query);
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Event.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("participants");
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
