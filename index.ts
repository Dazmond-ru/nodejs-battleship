import { randomUUID, UUID } from 'node:crypto';
import WebSocket, { RawData, WebSocketServer } from 'ws';
import { sendErrorMessage, validateWebsocketCommand } from './src/utils/utils';
import { httpServer } from './src/http_server';

const HTTP_PORT = process.env.HTTP_PORT ?? 8181;
const WS_PORT = process.env.WS_PORT ?? 3000;

const users: Record<UUID, WebSocket> = {};

const wsServer = new WebSocketServer({ port: WS_PORT as number });
console.log(`Start websocket server on the ${WS_PORT} port!`);

wsServer.on('connection', (ws) => {
  const newUserId = randomUUID();
  console.log(`New connection`);
  users[newUserId] = ws;

  console.log(`User ${newUserId} connected`);

  ws.on('message', (data: RawData) => {
    console.log('Incoming', data.toString());

    const parsed = JSON.parse(data.toString());

    if (!validateWebsocketCommand(parsed)) {
      console.log('Validation failed!');
      sendErrorMessage(ws);
    }
  });

  ws.on('close', () => {
    const disconnectedUserId = newUserId;
    delete users[disconnectedUserId];

    const data = JSON.stringify({
      message: 'User disconnected',
      disconnectedUserId: disconnectedUserId
    });

    for (const userId in users) {
      const client = users[userId as UUID];
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  });
});

httpServer.on('connection', (socket) => {
  socket.unref();
});

process.on('SIGINT', () => {
  wsServer.close();
  httpServer.close();
});

const start = () => {
  try {
    httpServer.listen(HTTP_PORT, () => {
      console.log(`Start static http server on the ${HTTP_PORT} port!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
