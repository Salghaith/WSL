import mongoose from 'mongoose';
const { Schema } = mongoose;

const businessSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the business owner
  businessName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // Business owner's phone number
  location: { type: String, required: true },
  categories: [{ type: String, required: true, enum: ['Electricians', 'Car Washes', 'Plumbers', 'Mechanics', 'Cleaning Services']}], // Array of categories (e.g., electricians, car washes)
  description: { type: String, required: true }, // Business description
  images: [{ type: String }],
  openingHours: { type: String, required: true },
  ratings: { type: Number, default: 0 }, // Average rating for the business
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // Array of review references
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Business', businessSchema);
