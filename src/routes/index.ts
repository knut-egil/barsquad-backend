// Import
import { Router } from "express";
import SquadRouter from "./squad.router";

// Create router
const router = Router();

// Hello, world endpoint
router.get("/", (req, res) => {
  res.end("Hello, world!");
});

// Use squad router
router.use("/squad", SquadRouter);

export default router;
