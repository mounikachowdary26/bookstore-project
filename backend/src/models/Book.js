import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['adventure', 'business', 'horror', 'fiction']
  },
  newPrice: {
    type: Number,
    required: true
  },
  oldPrice: {
    type: Number,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Book', bookSchema); 