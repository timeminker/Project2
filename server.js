//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const Bike = require('./models/bikesschema.js')
const Review = require('./models/reviews.js')
const seedData = require('./models/data.js')
require('dotenv').config()
const GOOGLE_API_KEY = process.env.API_KEY_GOOGLE_MAPS
const bikesController = require('./controllers/bikes.js')
// const reviewsController = require('./controllers/reviews.js')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , () => {
  console.log('connected to mongo');
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//controllers
app.use(bikesController)

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//seed - use once!
// app.get('/bkbikes/seed', (req, res) => {
//   Bike.create(seedData, (err, createdData) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('seed added to DB');
//       res.redirect('/bkbikes')
//     }
//   })
// })

// //localhost:3000
// app.get('/bkbikes' , (req, res) => {
//   Bike.find({}, (err, allBikes) => {
//     res.render(
//       'index.ejs',
//       {
//         bikes: allBikes
//       })
//   })
// });
//
// //new bike
// app.get('/bkbikes/new', (req, res) => {
//   res.render('new.ejs')
// })
//
// //create
// app.post('/bkbikes', (req, res) => {
//   Bike.create(req.body, (err, createdBike) => {
//     res.redirect('/bkbikes')
//   })
// })

//review page
app.get('/review/:id', (req, res) => {
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
app.post('/review/:id', (req, res) => {
  Review.create(req.body, (err, review) => {
    Bike.findByIdAndUpdate(req.params.id, {$push:{reviews: review}}, {new:true}, (err, newData) => {
      res.redirect(`/bkbikes/${req.params.id}`)
    })
  })
})

// app.post('/review/:id', (req, res) => {
//   Bike.findById(req.params.id, (err, foundBike) => {
//     Review.create(req.body, (err, createdReview) => {
//       foundBike.reviews.push(createdReview)
//       foundBike.save((err, data) => {
//         console.log(createdReview);
//         res.redirect('/bkbikes')
//       })
//     })
//   })
// })
// app.post('/review', (req, res) => {
//     Review.create(req.body, (err, createdReview) => {
//       // foundBike.reviews.push(createdReview)
//       // foundBike.save((err, data) => {
//         console.log(createdReview);
//         // res.redirect('/bkbikes')
//       })
//     })

// //contact page
// app.get('/bkbikes/info', (req, res) => {
//   res.render('location.ejs',
//   {
//     GOOGLE_API_KEY: process.env.API_KEY_GOOGLE_MAPS
//   })
//
// })
//
// //road bikes page
// app.get('/bkbikes/road' , (req, res) => {
//   Bike.find({}, (err, allBikes) => {
//     res.render(
//       'road.ejs',
//       {
//         bikes: allBikes
//       })
//   })
// });
//
// //mountain bikes page
// app.get('/bkbikes/mountain' , (req, res) => {
//   Bike.find({}, (err, allBikes) => {
//     res.render(
//       'mtb.ejs',
//       {
//         bikes: allBikes
//       })
//   })
// });
//
// //gravel bikes page
// app.get('/bkbikes/gravel' , (req, res) => {
//   Bike.find({}, (err, allBikes) => {
//     res.render(
//       'gravel.ejs',
//       {
//         bikes: allBikes
//       })
//   })
// });
//
// //custom bikes page
// app.get('/bkbikes/custom' , (req, res) => {
//   Bike.find({}, (err, allBikes) => {
//     res.render(
//       'custom.ejs',
//       {
//         bikes: allBikes
//       })
//   })
// });
//
// //edit bike
// app.get('/bkbikes/edit/:id', (req, res) => {
//   Bike.findById(req.params.id, (err, foundBike) => {
//     res.render(
//       'edit.ejs',
//       {
//         bike: foundBike
//       }
//     )
//   })
// })
//
// //show individual bikes
// app.get('/bkbikes/:id', (req, res) => {
//   Bike.findById(req.params.id, (err, foundBike) => {
//     res.render(
//       'show.ejs',
//       {
//         bike: foundBike
//       }
//     )
//   })
// })
//
// // put
// app.put('/bkbikes/:id', (req, res) => {
//   Bike.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBike) => {
//     res.redirect('/bkbikes')
//   })
// })
//
// //delete bike
// app.delete('/bkbikes/:id', (req, res) => {
//   Bike.findByIdAndRemove(req.params.id, (err, deleteBike) => {
//     res.redirect('/bkbikes')
//   })
// })

//for heroku
app.get('/', (req, res) => {
  res.redirect('/bkbikes')
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
