const express = require('express');
const app = express();

const doctorRoute = express.Router();
let Doctor = require('../model/doctor');

// Add Doctor
doctorRoute.route('/add').post((req, res, next) => {
    Doctor.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all Doctors
doctorRoute.route('/').get((req, res) => {
    Doctor.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get a Doctor by id (req.params.id)
doctorRoute.route('/read/:id').get((req, res) => {
    Doctor.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Doctor (pass id)
doctorRoute.route('/update/:id').put((req, res, next) => {
    Doctor.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Doctor updated successfully!')
    }
  })
})

// Delete Doctor
doctorRoute.route('/delete/:id').delete((req, res, next) => {
    Doctor.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = doctorRoute