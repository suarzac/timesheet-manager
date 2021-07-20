const express = require('express');
const app = express();

const timecardRoute = express.Router();
let Timecard = require('../model/timecard');

// Add Timecard
timecardRoute.route('/add').post((req, res, next) => {
    Timecard.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all Timecards
timecardRoute.route('/').get((req, res) => {
    Timecard.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get a Timecard by id (req.params.id)
timecardRoute.route('/read/:id').get((req, res) => {
    Timecard.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Timecard (pass id)
timecardRoute.route('/update/:id').put((req, res, next) => {
    Timecard.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Timecard updated successfully!')
    }
  })
})

// Delete Timecard
timecardRoute.route('/delete/:id').delete((req, res, next) => {
    Timecard.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = timecardRoute