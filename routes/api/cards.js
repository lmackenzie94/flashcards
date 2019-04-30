const express = require("express");
const router = express.Router();

const Card = require("../../models/Card");

// @route GET api/cards
// @desc Get ALL Cards
// @access Public

router.get("/", (req, res) => {
  Card.find().then(cards => res.json(cards));
});

// @route POST api/cards
// @desc Create a Card
// @access Public

router.post("/", (req, res) => {
  const newCard = new Card({
    //Card refers to our Schema
    question: req.body.question,
    answer: req.body.answer,
    topic: req.body.topic
  });
  newCard
    .save()
    .then(card => res.json(card))
    .catch(err => console.log(`Oops, something went wrong: ${err}`)); //save to database
});

// @route DELETE api/cards/:id
// @desc Delete a Card
// @access Public

router.delete("/:id", (req, res) => {
  Card.findById(req.params.id)
    .then(card => card.remove())
    .then(() => res.json({ success: true })) //this can be anything
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
