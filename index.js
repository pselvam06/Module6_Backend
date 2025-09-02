import express from "express";
import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dbconnection from "./config/dbconnection.js";



const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/flights", flightRoutes);
app.use("/bookings", bookingRoutes);

// Server start
dbconnection();
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
