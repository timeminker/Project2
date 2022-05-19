const express = require('express')
const router = express.Router()
const Bike = require('../models/bikesschema.js')

//localhost:3000
router.get('/bkbikes' , (req, res) => {
  Bike.find({}, (err, allBikes) => {
    res.render(
      'index.ejs',
      {
        bikes: allBikes
      })
  })
});

//new bike
router.get('/bkbikes/new', (req, res) => {
  res.render('new.ejs')
})

//create
router.post('/bkbikes', (req, res) => {
  Bike.create(req.body, (err, createdBike) => {
    res.redirect('/bkbikes')
  })
})

//contact page
router.get('/bkbikes/info', (req, res) => {
  res.render('location.ejs',
  {
    GOOGLE_API_KEY: process.env.API_KEY_GOOGLE_MAPS
  })

})

//road bikes page
router.get('/bkbikes/road' , (req, res) => {
  Bike.find({}, (err, allBikes) => {
    res.render(
      'road.ejs',
      {
        bikes: allBikes
      })
  })
});

//mountain bikes page
router.get('/bkbikes/mountain' , (req, res) => {
  Bike.find({}, (err, allBikes) => {
    res.render(
      'mtb.ejs',
      {
        bikes: allBikes
      })
  })
});

//gravel bikes page
router.get('/bkbikes/gravel' , (req, res) => {
  Bike.find({}, (err, allBikes) => {
    res.render(
      'gravel.ejs',
      {
        bikes: allBikes
      })
  })
});

//custom bikes page
router.get('/bkbikes/custom' , (req, res) => {
  Bike.find({}, (err, allBikes) => {
    res.render(
      'custom.ejs',
      {
        bikes: allBikes
      })
  })
});

//edit bike
router.get('/bkbikes/edit/:id', (req, res) => {
  Bike.findById(req.params.id, (err, foundBike) => {
    res.render(
      'edit.ejs',
      {
        bike: foundBike
      }
    )
  })
})

//show individual bikes
router.get('/bkbikes/:id', (req, res) => {
  Bike.findById(req.params.id, (err, foundBike) => {
    res.render(
      'show.ejs',
      {
        bike: foundBike
      }
    )
  })
})

// put
router.put('/bkbikes/:id', (req, res) => {
  Bike.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBike) => {
    res.redirect('/bkbikes')
  })
})

//delete bike
router.delete('/bkbikes/:id', (req, res) => {
  Bike.findByIdAndRemove(req.params.id, (err, deleteBike) => {
    res.redirect('/bkbikes')
  })
})

module.exports = router
