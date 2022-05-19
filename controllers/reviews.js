const express = require('express')
const router = express.Router()
const Review = require('../models/reviews.js')
const Bike = require('../models/bikesschema.js')

//review page
router.get('/review/:id', (req, res) => {
  Bike.findById(req.params.id, (err, foundBike) => {
    res.render(
      'review.ejs',
      {
        bike: foundBike
      }
    )
  })
})

// create new review
router.post('/review/:id', (req, res) => {
  Review.create(req.body, (err, review) => {
    Bike.findByIdAndUpdate(req.params.id, {$push:{reviews: review}}, {new:true}, (err, newData) => {
      res.redirect(`/bkbikes/${req.params.id}`)
    })
  })
})

module.exports = router
