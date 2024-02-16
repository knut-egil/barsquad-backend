// Import
import { Router } from "express";
import { join, create } from "../controllers/squad.controller";

// Create router
const router = Router();

// Create a new squad
router.post("/create", create);

// Join an existing squad by code
router.post("/join", join);

// Per-squad router
const squadRouter = Router();

// Update squad member location
squadRouter.post("/location", (req, res) => {
  // Log!
  console.info(
    `POST /:code/location, date: ${new Date(
      req.body.locations[0].timestamp
    ).toISOString()} data: ${JSON.stringify(req.body, null, 2)}`
  );

  // TODO: Look up in squad registry
  // and update location for the instance!
  // Location updates incoming! roughly every 15s in background even!

  // Sure
  res.end();
});

// Register per-squad router
router.use("/:code", squadRouter);

export default router;
