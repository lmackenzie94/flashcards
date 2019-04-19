// npm run dev to start servers

const express = require("express");
const app = express(); //initialize an instance of express
const port = 3001; //dont use 3000 because that's the default for create-react-app
const bodyParser = require("body-parser"); // body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
let flashcards = [
  {
    id: 1,
    question: "What does HTML stand for?",
    answer: "Hypertext Markup Language"
  },
  {
    id: 1,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets"
  },
  {
    id: 1,
    question: "Some other question?",
    answer: "Some other answer"
  }
];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/flashcards", (req, res) => {
  res.json(flashcards);
});

app.post("/addFlashcard", (req, res) => {
  const newFlashcard = req.body.addFlashcard;
  console.log(newFlashcard);
  flashcards.push({ newFlashcard });
  //   res.redirect("/api/flashcards");
  res.send(newFlashcard);
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started on port ${port}`);
});

// installed express and concurrency
// Added the following scripts to package.json:
// "scripts": {
//     "start": "node app.js",
//     "server": "nodemon app.js"
// }
// added "proxy": "http://localhost:3001" to 'client' directory package.json
// this allows us to make requests to our back end without having to explicitly write out http://localh... (in our fetch, for example)
// Added to package.json scripts:
// "client": "cd client && npm start" -- can also be written like "npm start --prefix client"
// "dev": "concurrently \"npm run server\" \"npm run client\"" -- will run the two scripts for us when we do 'npm run dev'
// npm i body-parser -- save
// npm install react-router-dom --save-dev
