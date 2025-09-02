import express from "express";
import Booking from "../models/booking.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE booking (Passenger only)
router.post("/", authMiddleware, roleMiddleware(["Passenger"]), async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ bookings (Admin sees all, Passenger sees own)
router.get("/", authMiddleware, async (req, res) => {
  try {
    let bookings;
    if (req.user.role === "Admin") {
      bookings = await Booking.find();
    } else {
      bookings = await Booking.find({ email: req.user.email });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE booking status (Admin approves/rejects)
router.put("/:id", authMiddleware, roleMiddleware(["Admin"]), async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE booking (Passenger cancel their own)
router.delete("/:id", authMiddleware, roleMiddleware(["Passenger"]), async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
