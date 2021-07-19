//* Primary Backend File

//* Importing Major Dependencies

//? Server and DB Dependencies
import express from 'express';
import mongoose, { Error } from 'mongoose';

//? Routing Dependencies
import cors from 'cors'
import session from 'express-session';

//? Auth Strategy Dependencies
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

//? Importing the dotenv file for storing secret codes
import dotenv from 'dotenv';
dotenv.config();

//? Importing User dependencies
import { IMongoDBUser } from './types';
import User from './User';

//* Initializing the Express to app 
const app = express();

//* Connecting to the mongoose db cluster
mongoose.connect(`${process.env.MONGOOSE_START}${process.env.USER_NAME}:${process.env.DB_PASS}${process.env.MONGOOSE_END}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`The mongoose db cluster is running here..`);
});

//* Setting up the Express Middleware
app.use(express.json);
app.use(cors ({origin: "http://localhost:3000", credentials: true}) )
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
        cookie: {
          sameSite: "none",
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
        }

    })
);

//* Passport Section
app.use(passport.initialize());
app.use(passport.session());

// Using Passport to Serialize and Deserialize the User

// In serialize we take entire user object from auth and store into session
passport.serializeUser((user: IMongoDBUser, done: any) => {
  return done(null, user._id);
})

passport.deserializeUser((id: string, done: any) => {
  User.findById(id, (err: Error, doc: IMongoDBUser) => {
    // What we return goes to the client and binds to the req.user property
    return done(null, doc);
  })
})


//* Configuring Google OAuth Strategy: Check
passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "http://localhost:4000/auth/google/callback"
  },
  
  function(_: any, __: any, profile: any, cb: any) {
   // Called after a successful authentication
   // Find user in the Database with the "googleId", if err then create one
   User.findOne({ googleId: profile.id }, async (err: Error, doc: IMongoDBUser) => {

      if (err) {
        return cb(err, null);
      }

      if (!doc) {
        const newUser = new User({
          googleId: profile.id,
          username: profile.name.givenName
        });

        // Awaiting till new user is created
        await newUser.save();
        // Callback initiated for "newUser" from MongoDB
        cb(null, newUser);
    }
    // Callback initiated for existing user = "doc" from MongoDB
    cb(null, doc);
  })
  }

));

//* Google OAuth Request Handlers
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//* Configuring Twitter OAuth Strategy: Check

passport.use(new TwitterStrategy({
  consumerKey: `${process.env.TWITTER_CLIENT_ID}`,
  consumerSecret: `${process.env.TWITTER_CLIENT_SECRET}`,
  callbackURL: "http://localhost:4000/auth/twitter/callback"
},
  function (_: any, __: any, profile: any, cb: any) {

    // Find user in the Database with the "twitterId", if err then create one
    User.findOne({ twitterId: profile.id }, async (err: Error, doc: IMongoDBUser) => {

      if (err) {
        return cb(err, null);
      }

      if (!doc) {
        const newUser = new User({
          twitterId: profile.id,
          username: profile.username
        });

        // Awaiting till new user is created
        await newUser.save();
        // Callback initiated for "newUser" from MongoDB
        cb(null, newUser);
      }
      // Callback initiated for existing user = "doc" from MongoDB
      cb(null, doc);
    })

  }
  
));

//* Twitter OAuth Request Handlers
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login', session: true }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//* Configuring Github OAuth Strategy: Check
passport.use(new GitHubStrategy({
  clientID: `${process.env.GITHUB_CLIENT_ID}`,
  clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
  callbackURL: "http://localhost:4000/auth/github/callback"
},
  function (_: any, __: any, profile: any, cb: any) {

    // Find user in the Database with the "githubId", if err then create one
    User.findOne({ githubId: profile.id }, async (err: Error, doc: IMongoDBUser) => {

      if (err) {
        return cb(err, null);
      }

      if (!doc) {
        const newUser = new User({
          githubId: profile.id,
          username: profile.username
        });

        // Awaiting till new user is created
        await newUser.save();
        // Callback initiated for "newUser" from MongoDB
        cb(null, newUser);
      }
      // Callback initiated for existing user = "doc" from MongoDB
      cb(null, doc);
    })

  }

));

//* Github OAuth Request Handlers
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', session: true }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//* Routing the Express
app.get("/", (req, res) => {
    res.send("Hello World, the node is here");
}),

//* Setting up End-Point for user
app.get("/getuser", (req, res) => {
  res.send(req.user);
}),

//* Setting up Log-out for user
app.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }

})

//* Just checking the port connection where the express is hosted
app.listen(process.env.PORT || 4000, () => {
  console.log("The Server has started...");   
 })