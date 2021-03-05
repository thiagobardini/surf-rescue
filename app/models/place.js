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
      required: true,
    },
    surfLevel: {
      type: String,
      required: true,
    },
    avgCostDay: {
      type: Number,  
      required: true,
    },
    review: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = placeSchema
