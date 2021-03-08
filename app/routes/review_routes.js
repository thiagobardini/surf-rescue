const express = require("express");
const passport = require("passport");
const Review = require("../models/review");
const customErrors = require("../../lib/custom_errors");
const handle404 = customErrors.handle404;
const requireOwnership = customErrors.requireOwnership;
const removeBlanks = require("../../lib/remove_blank_fields");
const requireToken = passport.authenticate("bearer", { session: false });
const router = express.Router();

// // INDEX
// // GET /reviews
// router.get("/reviews", requireToken, (req, res, next) => {
//   Review.find({ owner: req.user._id })
//     .then((reviews) => {
//       return reviews.map((review) => review);
//     })

//     .then((reviews) => res.status(200).json({ reviews: reviews }))

//     .catch(next);
// });

// INDEX
// GET /reviews
router.get("places/reviews", requireToken, (req, res, next) => {
  Review.find()
    .then((reviews) => res.json({ reviews: reviews }))
    .catch(next);
});

// SHOW
// GET
router.get("places/:id/reviews/:id", requireToken, (req, res, next) => {
  Review.findById(req.params.id)
    .then(handle404)

    .then((review) => res.status(200).json({ review: review }))

    .catch(next);
});

// CREATE
// POST /reviews
router.post("/places/:id/reviews", requireToken, (req, res, next) => {
  console.log("The user Object: ", req.user);
  console.log("The incoming event data: ", req.body);
  Review.create(req.body.review)
    .then((review) => {
      console.log("created review -> res -> db -> review routes ", review);
      res.status(201).json({ review: review });
    })
    .catch(next);
});

// UPDATE
router.patch("places/:id/reviews/:id", requireToken, removeBlanks, (req, res, next) => {
  delete req.body.review.owner;
  Review.findById(req.params.id)
    .then(handle404)
    .then((review) => {
      console.log("Update -> account_routes ", review);
      requireOwnership(req, review);
      return review.updateOne(req.body.review);
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

// DESTROY
router.delete("places/:id/reviews/:id", requireToken, (req, res, next) => {
  Review.findById(req.params.id)
    .then(handle404)
    .then((review) => {
      // throw an error if current user doesn't own `review`
      requireOwnership(req, review);
      // delete the review ONLY IF the above didn't throw
      review.deleteOne();
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next);
});

module.exports = router;
