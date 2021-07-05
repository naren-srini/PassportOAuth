//* Primary Backend File

//* Importing Major Dependencies

//? Server and DB Dependencies
import express from 'express';
import mongoose from 'mongoose';

//? Routing Dependencies
import cors from 'cors'
import session from 'express-session';

//? Auth Strategy Dependencies
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//? Importing the dotenv file for storing secret codes
import dotenv from 'dotenv';
dotenv.config();

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

    })
);

//* Passport Section
app.use(passport.initialize());
app.use(passport.session());

// Using Passport Serialize and Deserialize
// todo Need to fix with specific ID
passport.serializeUser((user: any, done: any) => {
  return done(null, user);
})

passport.deserializeUser((user: any, done: any) => {
  return done(null, user);
})


//* Configuring Google OAuth Strategy: Check
passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "http://localhost:4000/auth/google/callback"
  },
  
  function(accessToken: any, refreshToken: any, profile: any, cb: any) {
   // Called after a successful authentication
   // Inserting user into the database
   console.log(profile);
   cb(null, profile);
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

//* Routing the Express
app.get("/", (req, res) => {
    res.send("Hello World, the node is here");
}),

//* Just checking the port connection where the express is hosted
app.listen(4000, () => {
  console.log("Server has started...");   
 })