const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('./reviews.js')

const bikeSchema = new Schema ({
  category: {type: String, required: true},
  manufacturer: {type: String, required: true},
  model: {type: String, required: true},
  year: Number,
  image: String,
  tags: [{type: String, index: true}],
  reviews: [Review.schema]
})

const bikeCollection = mongoose.model('Bike', bikeSchema)

module.exports = bikeCollection
