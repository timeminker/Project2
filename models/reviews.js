const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  name: String,
  review: String
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
