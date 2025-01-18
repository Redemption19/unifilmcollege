import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'successful', 'failed'],
    default: 'pending'
  },
  reference: { type: String, required: true, unique: true },
  formSent: { type: Boolean, default: false },
}, {
  timestamps: true,
  // Define all indexes in schema options
  indexes: [
    { status: 1 },
    { createdAt: -1 }
  ]
});

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;