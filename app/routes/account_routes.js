// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for accounts
const Account = require('../models/account')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { account: { title: '', text: 'foo' } } -> { account: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /accounts
router.get('/account', requireToken, (req, res, next) => {
  Account.find()
  console.log("Print: ", req.body )
    .then(accounts => {
      // `accounts` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return accounts.map(account => account.toObject())
    })
    // respond with status 200 and JSON of the accounts
    .then(accounts => res.status(200).json({ accounts: accounts }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /accounts/5a7db6c74d55bc51bdf39793
router.get('/accounts/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Account.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "account" JSON
    .then(account => res.status(200).json({ account: account.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /accounts
router.post('/accounts', requireToken, (req, res, next) => {
    console.log("The user Object: ", req.user)
  console.log("The incoming event data: ", req.body)
  // set owner of new account to be current user
  req.body.account.owner = req.user.id
  
  Account.create(req.body.account)
    // respond to succesful `create` with status 201 and JSON of new "account"
    .then(account => {
      console.log('created account -> res -> db -> account routes ', account)
      res.status(201).json({ account: account.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /accounts/5a7db6c74d55bc51bdf39793
router.patch('/accounts/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.account.owner

  Account.findById(req.params.id)
    .then(handle404)
    .then(account => {
       console.log('Update -> account_routes ', account )
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, account)

      // pass the result of Mongoose's `.update` to the next `.then`
      return account.updateOne(req.body.account)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /account/5a7db6c74d55bc51bdf39793
router.delete('/accounts/:id', requireToken, (req, res, next) => {
  Account.findById(req.params.id)
    .then(handle404)
    .then(account => {
      // throw an error if current user doesn't own `account`
      requireOwnership(req, account)
      // delete the account ONLY IF the above didn't throw
      account.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
