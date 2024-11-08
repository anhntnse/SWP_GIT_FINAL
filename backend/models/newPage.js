const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['highlight', 'news', 'promotion'], // Define valid categories
      required: true,
    },
    author: {
      type: String,
      default: 'Anonymous',
    },
    newsImage: [],
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const News = mongoose.model('News', newsSchema);

module.exports = News;
