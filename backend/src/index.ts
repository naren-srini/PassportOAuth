//* Primary Backend File
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import session from 'express-session';
import passport from 'passport';

//* Importing the dotenv file
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

//* Express Middleware
app.use(express.json);
app.use(cors ({origin: "http://localhosr:3000", credentials: true}) )
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

//* Routing the express
app.get("/", (req, res) => {
    res.send("Hello World, the node is here");
})

//* Just checking the port connection where the express is hosted
app.listen(4000, () => {
  console.log("Server has started...");   
 })