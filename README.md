# PassportOAuth
OAuth 2.0 on React using Passport Authentication middleware using express.js
In the project directory, you can run:

## Scripts

In the project client directory you can run (DEV):

### `npm start`

Runs the app frontend at development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

In the project backend directory you can run:

### `npm run dev`

Runs the Primary Backend Server at Link: [http://localhost:4000/](http://localhost:4000/)

## In Production

* Fill out .env file with your secrets
* Make sure all auth providers are setup for http://localhost:4000
* Start ("npm run dev")

## Dependencies

bcryptjs -> Password Hashing  <br/>
cors -> Cross Origin Security <br/>
dotenv -> Access Env Variables  <br/>
express -> Backend Library  <br/>
express-session -> "In Memory" Sessions Handled With Express, Passport Requires This  <br/>
mongoose -> ORM To Access Resources For the MongoDB Database  <br/>
passport -> Library For Easy Secure Authentication of Users Using Express  <br/>
passport-google-oauth20 -> The Google Strategy for Passport  <br/>
passport-local -> Local Authentication Strategy with Passport  <br/>
passport-twitter-oauth2 -> Twitter Authentication Strategy with Passport  <br/>
passport-github -> Github Authentication With Passport  <br/>

## TypeScript Dependencies

@types/bcryptjs  <br/>
@types/cors  <br/>
@types/express  <br/>
@types/express-session  <br/>
@types/mongoose  <br/>
@types/passport  <br/>
@types/passport-local  <br/>
@types/passport-twitter-oauth2  <br/>
@types/passport-google-oauth20  <br/>
@types/passport-github  <br/>

👆 These Packages are Just Typescript Support For Dependencies (So we can use the packages type definitions)

## Installed

nodemon -> To Restart Server on Every Change When Building the Application <br/>
typescript -> Typescript is Necessary <br/>
tsc -> Compile to Javascript (Build Javascript Code, For Production) <br/>
ts-node -> Compile to Javascript & Run on the Fly (For Development) <br/>

## Mongoose Cluster

Simple Guide to create mongoose cluster

* Go to [mongoDB Site](https://cloud.mongodb.com/) 
* Create account and proceed with instructions on site to create organization etc,.
* Create a project with specific name, follow instructions and then open it
* Create a "New Cluster" inside the project by entering the neccessary information
* Open the cluster and click "Connect", and then click "Connect to your Application"
* Change Driver to Node.js > Choose Version (3.6 or later)
* Look up for the uri string (e.g uri=mongodb+srv://your-db-name:<password><your-cluster-name>.mongodb.net/<your-database-name>?retryWrites=true&w=majority'
* Copy this from your Mongoose Cluster and store it in your .env file
* When collecting user information from app, go to collections tab in the cluster to view data

## Links

Ensure ALL Auth providers match your respective backend endpoints in index.ts and local dotenv files: <br/>
Google OAuth2.0: https://github.com/jaredhanson/passport-google-oauth2  <br/>
Google Auth API Link: https://console.cloud.google.com/apis/dashboard  <br/>
Google OAuth Scopes: https://developers.google.com/identity/protocols/oauth2/scopes#google-sign-in  <br/>
Twitter Developer Dashboard: https://developer.twitter.com/en/portal/dashboard <br/>
Github Developer Dashboard: https://github.com/settings/developers <br/>
  
## Project Notes
  
  * The Client/Frontend uses React on TypeScript, with State Management using React
  * The Backend uses Express.js (Server + Routing) + Node.js (DB connections)
  * The Authentication is performed using [Passport Strategies] using OAuth (http://www.passportjs.org/packages/) 
  * This project contains Code Analysis that is not required for development (codeql-analysis.yml)
  * .env files are maintained locally.
  * There is a xmldom npm vulnerability (low) that is used in twitter OAuth
  * Use Developer Tools > Console in the web browser to view the data that is sent as json.  
  * Application deployment maybe done using Heroku or Netlify, which I have not done here currently.
