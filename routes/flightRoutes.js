import express from "express";
import Flight from "../models/flight.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE flight (Admin only)
router.post("/", authMiddleware, roleMiddleware(["Admin"]), async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all flights (public)
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE flight (Admin only)
router.put("/:id", authMiddleware, roleMiddleware(["Admin"]), async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFlight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE flight (Admin only)
router.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: "Flight deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
