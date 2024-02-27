export interface WebSocketCommand {
  id: 0;
  type: CommandType;
  data: CommandData;
}

export interface CommandData {
  name?: string;
  index?: number;
  error?: boolean;
  errorText?: string;
}

export enum CommandType {
  REG = 'reg',
  UPDATE_WINNERS = 'update_winners',
  CREATE_ROOM = 'create_room',
  ADD_PLAYER_TO_ROOM = 'add_player_to_room',
  CREATE_GAME = 'create_game',
  UPDATE_ROOM = 'update_room',
  ADD_SHIPS = 'add_ships',
  START_GAME = 'start_game',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
  TURN = 'turn',
  FINISH = 'finish',
}
