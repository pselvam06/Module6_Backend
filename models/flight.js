import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  flightName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  journeyDateTime: { type: Date, required: true }
});

const Flight = mongoose.model("Flight", flightSchema);
export default Flight;
