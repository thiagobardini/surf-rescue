const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    localName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
   localImg: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    surfLevel: {
      type: String,
      required: false,
    },
    avgCostDay: {
      type: Number,
      required: false,
    },
    waveRange: {
      type: Number,
      required: false,
    },
    stance: {
      type: String,
      required: false,
    },
    owner: 
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Place', placeSchema)