// Import
import { Router } from "express";

// Create router
const router = Router();

// Hello, world endpoint
router.get("/", (req, res) => {
  res.end("Hello, world!");
});

export default router;
