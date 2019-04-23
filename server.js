// npm run dev to start servers

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body

const cards = require("./routes/api/cards");

const app = express(); //initialize an instance of express

app.use(bodyParser.json());

// this variable holds the URI of the mongo database
const db = require("./config/keys").mongoURI;

// Connect to Mongo using mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/cards", cards);
// any request to /api/cards will refer to the cards variable above, which refers to the routes directory

const port = process.env.PORT || 3001; //need process.env for eventual deployment to heroku

app.listen(port, () => console.log(`Server started on port ${port}`));

// installed express and concurrency
// Added the following scripts to package.json:
// "scripts": {
//     "start": "node server.js",
//     "server": "nodemon server.js"
// }
// added "proxy": "http://localhost:3001" to 'client' directory package.json
// this allows us to make requests to our back end without having to explicitly write out http://localh... (in our fetch, for example)
// Added to package.json scripts:
// "client": "cd client && npm start" -- can also be written like "npm start --prefix client"
// "dev": "concurrently \"npm run server\" \"npm run client\"" -- will run the two scripts for us when we do 'npm run dev'
// npm i body-parser -- save
// npm install react-router-dom --save-dev
// npm install mongoose
// added client-install script
