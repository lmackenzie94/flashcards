const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const CardSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  }
});

// Create and export/expose the model 'Card'
module.exports = Card = mongoose.model("Card", CardSchema);
