const express = require("express");
const passport = require("passport");
const Account = require("../models/account");
const customErrors = require("../../lib/custom_errors");
const handle404 = customErrors.handle404;
const requireOwnership = customErrors.requireOwnership;
const removeBlanks = require("../../lib/remove_blank_fields");
const requireToken = passport.authenticate("bearer", { session: false });
const router = express.Router();

// INDEX
// GET 
router.get("/accounts", requireToken, (req, res, next) => {
  Account.find({ owner: req.user._id })
    .then((accounts) => {
      // `accounts` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      // return accounts.map(account => account.toObject())
      return accounts.map((account) => account);
    })
    // respond with status 200 and JSON of the accounts
    .then((accounts) => res.status(200).json({ accounts: accounts }))
    // if an error occurs, pass it to the handler
    .catch(next);
});

// // Show
// // GET /accounts
// router.get("/accounts", requireToken, (req, res, next) => {
//   Account.find()
//     .then((accounts) => res.json({ accounts: accounts }))
//     .catch(next);
// });

// SHOW
// GET
router.get("/accounts/:id", requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  const id = req.params.id;
  Account.findById(req.params.id)
    .populate("owner")
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "account" JSON
    .then((account) => res.status(200).json({ account: account }))
    // if an error occurs, pass it to the handler
    .catch(next);
});

// CREATE
// POST /accounts
router.post("/accounts", requireToken, (req, res, next) => {
  console.log("The user Object: ", req.user);
  console.log("The incoming event data: ", req.body);
  // set owner of new account to be current user
  // req.body.account.owner = req.user.id;

  Account.create(req.body.account)
    // respond to succesful `create` with status 201 and JSON of new "account"
    .then((account) => {
      console.log("created account -> res -> db -> account routes ", account);
      res.status(201).json({ account: account });
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next);
});

// UPDATE
router.patch("/accounts/:id", requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.account.owner;

  Account.findById(req.params.id)
    .then(handle404)
    .then((account) => {
      console.log("Update -> account_routes ", account);
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, account);

      // pass the result of Mongoose's `.update` to the next `.then`
      return account.updateOne(req.body.account);
    })
    // 202 -> send message
    // if that succeeded, return 204 and no JSON
    .then(() => res.status(202).send({message: 'User succesfull '}))
    // if an error occurs, pass it to the handler
    .catch(next);
});

// DESTROY
router.delete("/accounts/:id", requireToken, (req, res, next) => {
  Account.findById(req.params.id)
    .then(handle404)
    .then((account) => {
      // throw an error if current user doesn't own `account`
      requireOwnership(req, account);
      // delete the account ONLY IF the above didn't throw
      account.deleteOne();
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next);
});

module.exports = router;
