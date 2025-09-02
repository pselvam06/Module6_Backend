import express from "express";
import cors from "cors";
import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dbconnection from "./config/dbconnection.js";




const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true                 // allow cookies/auth headers if needed
}));

// Routes
app.use("/auth", authRoutes);
app.use("/Flights", flightRoutes);
app.use("/Bookings", bookingRoutes);

// Server start
dbconnection();
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
