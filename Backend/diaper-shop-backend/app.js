var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const dbase = require('./database')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRoutes = require('./routes/AuthRoutes');
const productRoutes = require('./routes/ProductRoutes');
const cartRoute = require('./routes/Cart');
const orderRoute = require('./routes/Orders');
const session = require("express-session")

var app = express();
app.use(express.json());

// CORS configuration 
const allowedOrigins = [
  'http://localhost:5173'   // frontend

];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};


//configuring session
app.use(session({
  secret: 'c3be9f946b9f94a6f4e9c18f3ddc2133e7e97c471cab3ff69b55b6ce90b29a1db4e7de9798b9cb5cbd5ff25ed2e6c136a8293a6f276b09d65ef1845971c99f65', 
    resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
    httpOnly: true, // helps prevent XSS
    secure: false,  // set to true in production with HTTPS
    sameSite: 'lax'
  }
}));

// Use CORS middleware with the options
app.use(cors(corsOptions));

//Routing middleware
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoute);
app.use('/orders', orderRoute);


// Declare your generic routes after your specific routes
app.use('/', indexRouter);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
