/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful.
 *
 * For example:
 *   => `node app.js`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *   => `modulus deploy`
 *   => `heroku scale`
 *
 *
 * The same command-line arguments are supported, e.g.:
 * `node app.js --silent --port=80 --prod`
 */


// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
// > Note: This is not required in order to lift, but it is a convenient default.
process.chdir(__dirname);

// Attempt to import `sails`.
var sails;
try {
  sails = require('sails');
} catch (e) {
  console.error('To run an app using `node app.js`, you usually need to have a version of `sails` installed in the same directory as your app.');
  console.error('To do that, run `npm install sails`');
  console.error('');
  console.error('Alternatively, if you have sails installed globally (i.e. you did `npm install -g sails`), you can use `sails lift`.');
  console.error('When you run `sails lift`, your app will still use a local `./node_modules/sails` dependency if it exists,');
  console.error('but if it doesn\'t, the app will run with the global sails instead!');
  return;
}

// --•
// Try to get `rc` dependency (for loading `.sailsrc` files).
var rc;
try {
  rc = require('rc');
} catch (e0) {
  try {
    rc = require('sails/node_modules/rc');
  } catch (e1) {
    console.error('Could not find dependency: `rc`.');
    console.error('Your `.sailsrc` file(s) will be ignored.');
    console.error('To resolve this, run:');
    console.error('npm install rc --save');
    rc = function () { return {}; };
  }
}


// Start server
sails.lift(rc('sails'));

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var config = require('./config');

// mongoose.connect('mongodb://localhost/phostack');
//
// var Schema = mongoose.Schema;
// var UserDetail = new Schema({
//       username: String,
//       password: String
//     }, {
//       collection: 'userInfo'
//     });
// var UserDetails = mongoose.model('userInfo', UserDetail);
//
// passport.use(new LocalStrategy(function(username, password, done) {
//   process.nextTick(function() {
//     UserDetails.findOne({
//       'username': username,
//     }, function(err, user) {
//       if (err) {
//         return done(err);
//       }
//
//       if (!user) {
//         return done(null, false);
//       }
//
//       if (user.password != password) {
//         return done(null, false);
//       }
//
//       return done(null, user);
//     });
//   });
// }));

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected correctly to server");
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('Server running on port 3000!');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.get('/login', function(req, res) {
  res.sendfile('views/login.html');
});

// app.use(app.router);

app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    // Auth Check Logic
  });
}));
