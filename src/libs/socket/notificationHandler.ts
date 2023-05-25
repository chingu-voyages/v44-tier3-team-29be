import { Server as IOServer, Socket } from 'socket.io'
import { sendMessage } from './helpers'
import { socketPool } from './socket'

export const notificaitonHandler = (io: IOServer, socket: Socket) => {
  socket.on('system_message', (message: string) => {
    console.info('System message from', socket.id, message)

    const targetSockets = Object.values(socketPool).filter(
      (id) => id !== socket.id
    ) as string[]

    sendMessage(io, 'system_message', targetSockets, message)
  })
}
