import http from "node:http";
import { WebSocketServer } from "ws";
import { setupWSConnection } from "@y/websocket-server/utils";

const PORT = process.env.PORT || 1234;

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });

  response.end("MapTogether sync server is running");
});

const wss = new WebSocketServer({
  noServer: true
});

wss.on("connection", (ws, request) => {
  console.log(
    `WebSocket connection: ${request.url}`
  );

  setupWSConnection(ws, request);
});

server.on("upgrade", (request, socket, head) => {
  console.log(
    `WebSocket upgrade: ${request.url}`
  );

  wss.handleUpgrade(
    request,
    socket,
    head,
    (ws) => {
      wss.emit("connection", ws, request);
    }
  );
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Sync server cannot start: port ${PORT} is already in use. ` +
      "Stop the other process or set PORT to a different value."
    );
    process.exitCode = 1;
    return;
  }

  throw error;
});

server.listen(PORT, () => {
  console.log(
    `MapTogether sync server running on ws://localhost:${PORT}`
  );
});