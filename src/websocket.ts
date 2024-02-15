import http from "http";
import socketio from "socket.io";

// Socket.io server reference
let server: socketio.Server;

/**
 * Init socket.io server
 * @param server
 */
function init(httpServer: http.Server) {
  // If no ioServer, set it up
  if (!server)
    // Set up new ioServer
    server = new socketio.Server(httpServer);

  // Return ioServer
  return server;
}

/**
 * Get socket.io server instance
 */
function get(): socketio.Server {
  // Return server instance
  return server;
}

// Export
export default { init, get };
