import { CommandType } from '../interfaces/interfaces';
import WebSocket from 'ws';

export function validateWebsocketCommand(obj: any) {
  return (
    'type' in obj &&
    'data' in obj &&
    'id' in obj &&
    Object.keys(obj).length === 3
  );
}

export function sendErrorMessage(ws: WebSocket) {
  ws.send(
    JSON.stringify({
      type: CommandType.REG,
      data: JSON.stringify({
        name: 'ERROR',
        index: 0,
        error: true,
        errorText: 'Validation failed'
      }),
      id: 0
    })
  );
}
