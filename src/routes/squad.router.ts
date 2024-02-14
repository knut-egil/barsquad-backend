// Import
import { Router } from "express";
import { join, create } from "../controllers/squad.controller";

// Create router
const router = Router();

// Create a new squad
router.post("/create", create);

// Join an existing squad by code
router.post("/join", join);

export default router;
