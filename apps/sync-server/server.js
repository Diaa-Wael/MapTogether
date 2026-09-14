import http from "node:http";
import { setupWSConnection } from "y-websocket/bin/utils.js";
import { WebSocketServer } from "ws";

const port = process.env.PORT || 1234;

const server = http.createServer((request, response) => {
  response.writeHead(200);
  response.end("MapTogether sync server");
});

const wss = new WebSocketServer({
  server
});

wss.on("connection", (ws, request) => {
  setupWSConnection(ws, request);
});

server.listen(port, () => {
  console.log(
    `MapTogether sync server listening on ${port}`
  );
});