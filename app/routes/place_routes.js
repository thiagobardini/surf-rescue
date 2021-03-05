const express = require('express')
const passport = require('passport')

const Account = require('../models/account')
const Place = require('../models/place')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// GET
router.get('/accounts/:id/places', requireToken, (req, res, next) => {
  const accountId = req.params.id
  Account.findById(accountId)
    .then(handle404)
    .then(account => {
      res.json({ places: account.places })
    })
    .catch(next)
})

// POST
router.post('/accounts/:id/places', (req, res, next) => {
  // store our place data in a variable
  const placeData = req.body.place

  // extract the accountId from our place's data
  const accountId = placeData.accountId

  // find the account document with the id accountId
  Account.findById(accountId)
    .then(handle404)
    .then(account => {
      // add a new place to our places subdocuments array
      account.places.push(placeData)

      // to save our changes, call `save` on the parent document
      return account.save()
    })
    // respond with the status 201 CREATED and the updated account
    .then(account => res.status(201).json({ account }))
    // otherwise if an error occurs
    .catch(next)

})

// DELETE
router.delete('/accounts/:id/places/:placeId', (req, res, next) => {
  // extract the placeId from our route paramaters
  const placeId = req.params.placeId

  // extract the accountId in the same way we did in create
  // from our place in req.body
  const accountId = req.body.place.accountId

  Account.findById(accountId)
    .then(handle404)
    .then(account => {
      // removes (deletes) a place from our account
      // account.places.id(placeId).remove()

      // another syntax for deleting is
      account.places.pull(placeId)

      // to save the deletion, call .save on the parent document
      return account.save()
    })
    // if we deleted the place successfully, send back a 204 No Content success message
    .then(() => res.sendStatus(204))
    // otherwise if an error occured, call the error middleware
    .catch(next)

})

// PATCH
router.patch('/places/:id/places/:placeId', (req, res, next) => {
  const placeId = req.params.placeId

  // extract the place from request's data (body)
  const placeData = req.body.place

  // extract the accountId from the placeData
  const accountId = placeData.accountId

  Account.findById(accountId)
    // if the account returned by findById is null, cause a 404 not found error

    .then(account => {
      // select the place from our account's places subdocument array
      const place = account.places.id(placeId)

      // update the place with the new placeData
      // (this is similar to updateOne, but for subdocuments)
      place.set(placeData)

      // save the place's parent document (account), so the updates persist
      return account.save()
    })
    // respond with a success status 204 No Content
    .then(() => res.sendStatus(204))
    // if an error occured, call the error middleware
    .catch(next)
})

// export the router so we can register the router in `server.js`
module.exports = router