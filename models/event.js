const { Schema, model } = require("mongoose");
const { handleMongooseErr } = require("../helpers");

const dataRegexp = /^\d{2}-\d{2}-\d{4}$/;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: String, match: dataRegexp, rquired: true },
    organizer: { type: String, required: true },
    participants: {
      type: Schema.Types.ObjectId,
      ref: "participant",
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

eventSchema.post("save", handleMongooseErr);

const Event = model("event", eventSchema);

module.exports = { Event };
