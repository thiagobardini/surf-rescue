const express = require('express')
const passport = require('passport')
const Place = require('../models/place')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// SHOW
// GET /places/:id
router.get('/places/:id', requireToken,(req, res, next) => {
  const id = req.params.id
  Place.findById(id)
    .populate('owner')
    .then(handle404)
    .then(place => res.json({ place: place}))
    .catch(next)
})

// INDEX
// GET /places
router.get('/places', requireToken,(req, res, next) => {
  Place.find()
    .populate('owner')
    .then(places => res.json({ places: places }))
    .catch(next)
})

// POST
router.post('/places', requireToken,(req, res, next) => {
  let placesData = req.body.place
  placesData.place.owner = req.user.id
  Place.create(placesData.place)
    .then(place => res.status(201).json({place: place}))
    .catch(next)
})

// UPDATE
router.patch('/places/:id', requireToken,(req, res, next) => {
  const id = req.params.id
  const placeData = req.body.place
  Place.findById(id)
    .then(handle404)
    .then(() => Place.updateOne(placeData))
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/places/:id', requireToken,(req, res, next) => {
  const id = req.params.id
  Place.findById(id)
    .then(handle404)
    .then((place) => place.deleteOne())
    .then(() => res.sendStatus(204))
    .catch(next)
})

// export the router so we can register the router in `server.js`
module.exports = router
