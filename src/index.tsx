import express from "express";
import cors from "cors";

// Create express app
const app = express();

// Set up middleware
app.use(express.json());
app.use(cors());

// Set up routes

// Listen
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.info(`[BarSquad] Server listening @ http://127.0.0.1:${PORT}`);
});
