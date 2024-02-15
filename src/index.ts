// Configure .env
import dotenv from "dotenv";
dotenv.config();

// Import
import http from "http";
import express from "express";
import cors from "cors";
import websocket from "./websocket";
import database from "./database";
import routes from "./routes";

// Async main wrapper
async function main() {
  try {
    // Connect to database!
    if (!(await database.init()))
      throw new Error("Failed to establish database connection.");

    // Success! Let's start our express app
    console.info("Connected to database!");

    // Create express app
    const app = express();

    // Crate http server
    const server = http.createServer(app);

    // Let's init the websocket server
    const io = websocket.init(server);

    // Basic websocket connection logger
    io.on("connection", (socket) => {
      // Log
      console.info(`A new WS client connected! Socket id: ${socket.id}`);
    });

    // Set up middleware
    app.use(express.json());
    app.use(cors());

    // Set up routes
    app.use("/api", routes);

    // Listen
    const PORT = process.env.PORT ?? 3000;
    server.listen(PORT, () => {
      console.info(`Server listening @ http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    // Get error message
    const { stack, message } = err as Error;
    // Log error
    console.error(`Something went wrong! Error: ${stack ?? message}`);
  }
}
main();
