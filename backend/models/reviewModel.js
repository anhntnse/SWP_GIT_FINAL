const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const reviewModel = mongoose.model('Review', reviewSchema);

module.exports = reviewModel;