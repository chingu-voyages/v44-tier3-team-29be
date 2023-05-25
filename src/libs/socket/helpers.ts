import { Server as IOServer } from 'socket.io'
import { TEmitEvent, TSocketPayload } from './ISocket'
import { socketPool } from './socket'

export const getUid = (id: string) =>
  Object.keys(socketPool).find((uid) => socketPool[uid] === id)

export const sendMessage = (
  io: IOServer,
  eventName: TEmitEvent,
  targetSockets: string[],
  payload: TSocketPayload
) => {
  console.info('Emmitting event>>>' + eventName + ' to ', targetSockets)

  switch (eventName) {
    case 'user_connected':
      targetSockets.forEach((id) => {
        io.to(id).emit('user_connected', payload)
      })
      break
    case 'user_disconnected':
      targetSockets.forEach((id) => {
        io.to(id).emit('user_disconnected', payload)
      })
      break
    case 'system_message':
      targetSockets.forEach((id) => {
        io.to(id).emit('system_message', payload as string)
      })
      break
    default:
      return
  }
}
