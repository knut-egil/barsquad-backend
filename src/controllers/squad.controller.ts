import { Request, Response } from "express";
import { BarSquad } from "../types/barsquad";
import { createSquad, findSquadByCode } from "./../services/squad.service";

type APIError = {
  message?: string;
  code?: string;
};
type APIResponse<T> = {
  success: boolean;
  error?: APIError;
  data?: T;
};

//#region Join
/**
 * Join squad payload
 */
type JoinPayload = {
  code: string;
};

/**
 * Join squad response
 *
 * name: Squad name
 */
type JoinResponse = BarSquad.SquadSession;

const join = async (
  req: Request<JoinPayload>,
  res: Response<APIResponse<JoinResponse>>
) => {
  // Look up active squads by code
  const { code } = req.body as JoinPayload;

  let errorMessage: string | undefined;
  let errorCode: string | undefined;

  try {
    // Validate code
    if (!code || code.length < 1) {
      // Set appropriate error message & code
      errorMessage = "Invalid squad code.";
      errorCode = "squad.code.invalid";

      // Throw error to send error response
      throw new Error("Invalid squad code.");
    }

    // Do a lookup in the database for an active squad session with a matching code!
    const squad = await findSquadByCode(code);

    // Check if we failed to find a squad
    if (!squad) {
      // Set appropriate error message & code
      errorMessage = "Unable to find a squad using the squad code.";
      errorCode = "squad.code.no_squad";

      // Throw error to send error response
      throw new Error("Unable to find a squad using the squad code.");
    }

    // Build join result
    const result: JoinResponse = squad;

    // Send response
    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    // Extract error message
    const { stack, message } = err as Error;

    // Log error
    console.warn(
      `An error occured in the squad 'join' controller, error: ${
        stack ?? message
      }`
    );

    // Create error object
    const error: APIError = {
      message: errorMessage ?? message ?? "An error occured.",
      code: errorCode,
    };

    // Send error response
    return res.json({
      success: false,
      error: error,
    });
  }
};
//#endregion

//#region Create
/**
 * Create squad payload
 *
 * name: Desired squad name
 */
type CreatePayload = {
  name: string;
};

/**
 * Create squad response
 *
 * name: Squad name
 * code: Squad join code
 */
type CreateResponse = BarSquad.SquadSession;

const create = async (
  req: Request<CreatePayload>,
  res: Response<APIResponse<CreateResponse>>
) => {
  // Look up active squads by code
  const { name } = req.body as CreatePayload;

  let errorMessage: string | undefined;
  let errorCode: string | undefined;

  try {
    // Validate name
    if (!name || name.length < 1) {
      // Set appropriate error message & code
      errorMessage = "Invalid squad name.";
      errorCode = "squad.name.invalid";

      // Throw error to send error response
      throw new Error("Invalid squad name.");
    }

    // Create squad session
    const squad = await createSquad(name);

    // Add to database

    // Build create result
    const result: CreateResponse = squad;

    // Send response
    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    // Extract error message
    const { stack, message } = err as Error;

    // Log error
    console.warn(
      `An error occured in the squad 'create' controller, error: ${
        stack ?? message
      }`
    );

    // Create error object
    const error: APIError = {
      message: errorMessage ?? message ?? "An error occured.",
      code: errorCode,
    };

    // Send error response
    return res.json({
      success: false,
      error: error,
    });
  }
};
//#endregion

export { join, create };
