// import
import { Namespace, Server, Socket } from "socket.io";
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
    // Extract :code param
    const code = socket.nsp.name.split("/").at(-1);

    // No code, reject connection!
    if (!code) {
      // Disconnect
      socket.disconnect();
      return;
    }

    // Assign join-code to socket instance
    (socket as Socket & { code: string }).code = code;

    // log
    console.info(
      `A new WS client connected to "/squad/${code}" namespace! Socket id: ${socket.id}`
    );
  });
}

// Export
export default { register };
