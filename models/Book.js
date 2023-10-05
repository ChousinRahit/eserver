const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide Book Title"],
  },
  bookID: {
    type: Number,
  },
  authors: {
    type: String,
  },
  average_rating: {
    type: String,
  },
  language_code: {
    type: String,
  },
  num_pages: {
    type: Number,
  },
  ratings_count: {
    type: Number,
  },
  publication_date: {
    type: String,
  },
  pilisher: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", BookSchema);
