import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users.routes.js';
import apartmentRoutes from './routes/apartments.routes.js';
import cartRoutes from './routes/cart.routes.js'; // Import cart routes

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api", apartmentRoutes);
app.use("/api", cartRoutes); // Use cart routes

app.listen(7000, () => {
  console.log("App running on port 7000 ....");
});

