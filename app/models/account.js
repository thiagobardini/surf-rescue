const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hometown: {
    type: String,
    required: true
  },
  surfLevel: {
    type: String,
    required: true
  },
  avgBudgetDay: {
    type: Number, 
    required: true
  }, 
  waveRange: {
    type: Number, 
    required: true
  }, 
  stance: {
    type: String, 
    required: true
  }, 
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Account', accountSchema)
