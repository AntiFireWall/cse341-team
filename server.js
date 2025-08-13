const express = require('express');
require('dotenv').config();
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

//passport configuration using google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://cse341-team-fclq.onrender.com/oauth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    //function to save user profile to database
    //or update existing user profile
    mongodb.getDatabase().db().collection("users").findOneAndUpdate(
      { googleId: profile.id },
      { $set: { googleId: profile.id, name: profile.displayName, email: profile.email } },
      { upsert: true, returnDocument: 'after' }
    ).then(user => {
      return done(null, user);
    }).catch(err => {
      return done(err, null);
    });
  }
));

// Serialize user to save in session
passport.serializeUser((user, done) => {
  done(null, user);
});
// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});


mongodb.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`);
    });
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});


/* ***********************
* Express Error Handler
* Placed after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  if (err.status) {
    console.error(`Stack: ${err.stack}`);
    console.error(`Status: ${err.status}`);
    console.error(`Message: ${err.message}`);
    res.status(err.status).send({
        status: err.status,
        message: err.message
  });
  } else {
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    console.error(`Stack: ${err.stack}`);
    res.status(500).send({
        error: err.message
  });
  }
  
});