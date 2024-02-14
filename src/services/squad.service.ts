import crypto from "crypto";
import EventEmitter from "events";
import { BarSquad } from "../types/barsquad";

export class SquadRegistry extends EventEmitter {
  static events = {
    SQUAD_ADDED: "SQUAD_ADDED",
  };
  private static instance = new SquadRegistry();

  static get() {
    return SquadRegistry.instance;
  }

  /**
   * Active squads list
   */
  squads: BarSquad.SquadSession[] = [];

  /**
   * Add squad to registry
   * @param squad
   */
  add(squad: BarSquad.SquadSession) {
    // Add to squad list
    this.squads.push(squad);

    // Emit squad added
    this.emit(SquadRegistry.events.SQUAD_ADDED, squad);
  }

  /**
   * Get squad by join code
   * @param code
   */
  get(code: string) {
    // Get squad by code
    const squad = this.squads.find((squad) => squad.code === code);

    // Return squad
    return squad;
  }
}
const squadRegistry = SquadRegistry.get();

squadRegistry.on(SquadRegistry.events.SQUAD_ADDED, (squad) => {
  console.info(`Squad "${squad.name}" added to squad registry!`);
});

//#region Create squad
type CreateSquadResult = BarSquad.SquadSession;

/**
 * Create a new squad session
 * @param name Squad name
 */
const createSquad = async (name: string): Promise<CreateSquadResult> => {
  // Create code
  const code = crypto.randomBytes(3).toString("hex"); // Gives us a 6 char code

  // Create squad
  const squad: BarSquad.SquadSession = {
    name: name,
    code: code,
    members: [],
  };

  // Register squad into active squad session registry
  squadRegistry.add(squad);

  // Set up websocket room

  // Create result
  const result: CreateSquadResult = squad;

  // Return result
  return result;
};
//#endregion

//#region Find/Join squad
type JoinSquadResult = BarSquad.SquadSession | undefined;

const findSquadByCode = async (code: string): Promise<JoinSquadResult> => {
  // Look up squad by code
  const squad = squadRegistry.get(code);

  // Create result
  const result: JoinSquadResult = squad;

  // Return result
  return result;
};
//#endregion

export { createSquad, findSquadByCode };
