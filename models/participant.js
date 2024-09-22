const { Schema, model } = require("mongoose");
const { handleMongooseErr } = require("../helpers");
const Joi = require("joi");

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
const sourceList = ["social media", "friends", "found myself"];

const participantSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: true,
    },
    dateOfBirth: { type: String, mach: dateRegex, rquired: true },
    source: {
      type: String,
      enum: sourceList,
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

participantSchema.post("save", handleMongooseErr);

const addPartSchema = Joi.object({
  fullNamename: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  source: Joi.string().required(),
});

const Participant = model("participant", participantSchema);

module.exports = {
  addPartSchema,
  Participant,
};
