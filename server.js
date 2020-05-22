const express = require('express');
const logger = require('morgan');

const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
const app = express();
const path = require('path');
require('console-stamp')(console, '[HH:MM:ss.l]');
require('dotenv').config();
const port = process.env.PORT;
const secretKey = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

var cors = require('cors')

const passport = require("passport");

app.use('/API', cors())
// app.use(function(req, res, next) {
//     console.log('sldflskhlksj')
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//set "public" folder for serving static files
app.use(express.static(path.join(__dirname, 'public')));


//var jwt = require('jsonwebtoken');
//var jwtAuthentication = require('express-jwt');
// jwtAuthentication.unless = require('express-unless');
//passport.unless = require('express-unless');



app.set('secretKey', secretKey); // jwt secret token
app.set('refreshTokenSecretKey', refreshSecretKey); // jwt secret refresh token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(logger('dev'));

// using  body parser for all routes
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())


//set render engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

const scopes = require('./routes/scopesRoute');
const users = require('./routes/usersRoute');
const customers = require('./routes/customersRoute');
const products = require('./routes/productsRoute');
const websites = require('./routes/websitesRoute');


app.get('/', function (req, res) {
  res.json({ "tutorial": "Build REST API with node.js" });
});


// public route
app.use('/API/users', users);

// athenticate root API route 
//app.use('/API', jwtAuthentication({ secret: 'nodeRestApi'}).unless({ path: [{ url: /\/API\/users/, methods: ['POST'] }] }));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


app.use('/API',passport.authenticate('jwt',{session:false}))
// Routes


// private route
app.use('/API/scopes', scopes);
app.use('/API/customers', customers);
app.use('/API/products', products);
app.use('/API/websites', websites);





//server.use('/products', jwtAuthentication({ secret: 'nodeRestApi'}), products);
// app.get('/favicon.ico', function (req, res) {
//   res.sendStatus(200);
// });



// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
// app.use(function (req, res, next) {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });



// handle errors
app.use(function (err, req, res, next) {
  console.log('-----error!------>', err);
  if (err.status === 401)
    res.status(401).json({
      message: err.message,
      name: err.name,
      code: err.code,
      details:{
        name: err.inner.name,
        expiredAt:err.inner.expiredAt
      }
    });
  else if (err.status === 404)
    res.status(404).json({ message: "Not found" });
  else
    res.status(500).json({ message: "Something looks wrong :( !!!" });
});



app.listen(port, function () {
  console.log(`Node server listening on port ${port}`);
});