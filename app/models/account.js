const mongoose = require('mongoose')
const placeSchema = require('./place')

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surfLevel: {
    type: String,
    required: true
  },
    budget: {
    type: Number, 
    required: true
  },  
  places: [placeSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Account', accountSchema)
