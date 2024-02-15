// import
import { Namespace, Server } from "socket.io";
import websocket from "./../websocket";

// References
let server: Server;
let squadNS: Namespace;

/**
 * Register namespace
 */
async function register() {
  // Get io server
  server = websocket.get();

  // Create namespace
  squadNS = server.of(/^\/squad\/([0-9a-fA-f]{6})$/gim);

  // Add basic connection listeneer
  squadNS.on("connection", (socket) => {
    // Log
    console.info(
      `A new WS client connected to "/squad" namespace! Socket id: ${socket.id}`
    );
  });
}

// Export
export default { register };
