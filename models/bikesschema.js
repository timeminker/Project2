const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bikeSchema = new Schema ({
  category: {type: String, required: true},
  manufacturer: {type: String, required: true},
  model: {type: String, required: true},
  year: Number,
  image: String,
  tags: [{type: String, index: true}]
})

const bikeCollection = mongoose.model('Bike', bikeSchema)

module.exports = bikeCollection
