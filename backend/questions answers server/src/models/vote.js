const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  voteValue: {
    type: Number,
    required: true,
    enum: [-1, 0, 1],
  },
  voter: {
    type: Number,
    required: true,
  },
  context: {
    type: String,
    enum: ["Question", "Answer"],
    required: true,
  },
  contextId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Vote", voteSchema);
