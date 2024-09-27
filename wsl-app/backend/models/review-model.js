import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true }, // Reference to the business
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the client who wrote the review
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
  comment: { type: String, required: true }, // Review comment
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Review', reviewSchema);
