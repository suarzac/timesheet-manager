const express = require('express');
const app = express();

const locationRoute = express.Router();
let Location = require('../model/location');

// Add Location
locationRoute.route('/add').post((req, res, next) => {
    console.log('Request function', req.body)
    Location.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all Locations
locationRoute.route('/').get((req, res) => {
    Location.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get a Location by id (req.params.id)
locationRoute.route('/read/:id').get((req, res) => {
    Location.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Location (pass id)
locationRoute.route('/update/:id').put((req, res, next) => {
    Location.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Location updated successfully!')
    }
  })
})

// Delete Location
locationRoute.route('/delete/:id').delete((req, res, next) => {
    Location.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = locationRoute