export namespace BarSquad {
  /**
   * The presence/safety status of a member
   *
   * present: Is within the safe-zone
   * absent: Has left the safe-zone, needs to be found!
   * adventuring: Has asked permission to leave for solo adventures.
   */
  export type SquadMemberStatus = "present" | "absent" | "adventuring";

  /**
   * Squad member
   */
  export type SquadMember = {
    /**
     * Name
     */
    name: string;
    /**
     * Status
     */
    status: SquadMemberStatus;
    /**
     * Last seen (last location update timestamp)
     */
    last_seen: number;

    /**
     * Location
     */
    location?: {
      lat: string;
      lng: string;
    };
  };

  /**
   * Squad session
   */
  export type SquadSession = {
    /**
     * Squad name
     */
    name: string;

    /**
     * Members
     */
    members: SquadMember[];

    /**
     * Squad code
     */
    code: string;
  };
}
