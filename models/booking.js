import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  passengerName: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  flightNumber: { type: String, required: true },
  journeyDate: { type: Date, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  totalPassengers: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
