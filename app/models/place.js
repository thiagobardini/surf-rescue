const mongoose = require("mongoose");
// const reviewSchema = require('./review')

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
    //  reviews: [reviewSchema],   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Place', placeSchema)

// LOCAL_NAME="TV" COUNTRY="Canada" LOCAL_IMG="<IMG>"  DESCRIPTION="TESTANDO" TOKEN=bc020a47d93ce61a90c7cbefe85b77ce sh curl-scripts/places/create.sh