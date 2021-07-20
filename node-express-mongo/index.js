let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoDb = require('./database/db');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
    console.log('Database sucessfully connected ')
  },
  error => {
    console.log('Database error: ' + error)
  }
)

// Tell node about existing routes
const doctorRoute = require('./routes/doctor.routes')
const locationRoute = require('./routes/location.routes')
const timecardRoute = require('./routes/timecard.routes')
const userRoute = require('./routes/user.routes')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/timesheet')));

// API root
// TODO create api root, should ?list all possible routes, schemas/collections?
// set api route
app.use('/api/doctor', doctorRoute)
app.use('/api/location', locationRoute)
app.use('/api/timecard', timecardRoute)
app.use('/api/user', userRoute)


// PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Listening on port ' + port)
})


// Base route
app.get('/', (req, res) => {
  res.send('this is base, according to Express');
});

// 404 Handler
app.use((req, res, next) => {
  res.send("Error 404");
  //next(createError(404));
});
// Keep last, catches all endpoints
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/timesheet/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
