const mongoose = require("mongoose");
const reviewSchema = require('./review')

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
    description: {
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
    waveRange: {
      type: Number,
      required: true,
    },
    stance: {
      type: String,
      required: true,
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: false
    }],
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

// LOCAL_NAME="TV" COUNTRY="Canada" LOCAL_IMG="<IMG>"  DESCRIPTION="TESTANDO" TOKEN=bc020a47d93ce61a90c7cbefe85b77ce sh curl-scripts/places/create.sh