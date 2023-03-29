export const ClientEvents = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'join_room',
  UPDATE_PLAYER: 'update_player',
  START_GAME: 'start_game',
  UPDATE_GAME: 'update_game',
}

export const ServerEvents = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  ROOM_JOINED: 'room_joined',
  ROOM_FULL: 'room_full',
  ROOM_NOT_FOUND: 'room_not_found',
  PLAYER_UPDATED: 'player_updated',
  PLAYER_ALREADY_CONNECTED: 'player_already_connected',
  GAME_STARTED: 'game_started',
  GAME_UPDATED: 'game_updated',
}

export const PORT = 3000
export const SERVER_HOST = '192.168.0.13'
