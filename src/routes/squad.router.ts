// Import
import { Request, Router } from "express";
import { join, create } from "../controllers/squad.controller";
import { SquadRegistry } from "../services/squad.service";

// Create router
const router = Router({ mergeParams: true });

// Create a new squad
router.post("/create", create);

// Join an existing squad by code
router.post("/join", join);

// Per-squad router
const squadRouter = Router({ mergeParams: true });

// Extract code param!
squadRouter.use((req, res, next) => {
  const { code } = req.params;

  (req as Request & { code: string }).code = code;

  next();
});

// Update squad member location
squadRouter.post("/location", (req, res) => {
  // Log!
  /*console.info(
    `POST /:code/location, date: ${new Date(
      req.body.locations[0].timestamp
    ).toISOString()} data: ${JSON.stringify(req.body, null, 2)}`
  );*/

  // TODO: Look up in squad registry
  // and update location for the instance!
  // Location updates incoming! roughly every 15s in background even!

  const {
    username,
    locations,
  }: {
    username: string;
    locations: [
      {
        coords: { latitude: number; longitude: number; accuracy: number };
        timestamp: number;
      }
    ];
  } = req.body;

  // Extract code
  const code = (req as Request & { code: string }).code;
  console.info(
    `[${new Date().toISOString()}] Location update requset from "${username}" for squad #${code}. Data: ${JSON.stringify(
      req.body
    )}`
  );

  // Get squad
  const squadRegistry = SquadRegistry.get();
  const squad = squadRegistry.get(code);

  if (!squad) {
    res.status(500).end();
    return;
  }
  // Find member and set new location!
  const memberIndex = squad.members.findIndex(
    (member) => member.name === username
  );
  if (memberIndex !== -1) {
    if (locations[0]) {
      const location = locations[0];

      // Update location
      squad.members[memberIndex].location = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };

      // Update last seen
      squad.members[memberIndex].last_seen = Math.round(location.timestamp);

      const member = squad.members[memberIndex];
      console.log(
        `[${new Date().toISOString()}] Updated "${
          member.name
        }" last_seen & location, new data: ${JSON.stringify(member, null, 2)}`
      );
    }
  }

  // Sure
  res.end();
});

// Get newest squad data!

type APIError = {
  message?: string;
  code?: string;
};
type APIResponse<T> = {
  success: boolean;
  error?: APIError;
  data?: T;
};

import { BarSquad } from "./../types/barsquad";
type SquadUpdateResponse = BarSquad.SquadSession;

squadRouter.get("/location", (req, res) => {
  // Extract code
  const code = (req as Request & { code: string }).code;

  // Get squad
  const squadRegistry = SquadRegistry.get();
  // Get latest data!
  const squad = squadRegistry.get(code);

  // Send result
  const result: APIResponse<SquadUpdateResponse> = {
    success: true,
    data: squad,
  };

  // Return!
  res.json(result);
});

// Register per-squad router
router.use("/:code", squadRouter);

export default router;
