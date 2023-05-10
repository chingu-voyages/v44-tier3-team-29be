import {
  IClientToServerEvents,
  IInterServerEvents,
  IServerToClientEvents,
  ISocketData
} from '@/types/socket'
import { Server as IOServer, Socket } from 'socket.io'
import { Server } from 'http'

export const initIOServer = (server: Server) => {
  const io = new IOServer<
    IClientToServerEvents,
    IServerToClientEvents,
    IInterServerEvents,
    ISocketData
  >(server, {
    cors: {
      origin: '*'
    }
  })

  const IOHandler = (socket: Socket) => {
    console.info('Message received from>>>', socket.id)

    socket.on('handshake', () => {
      console.info('Handshake received from>>>', socket.id)
    })

    socket.on('disconnect', () => {
      console.info('Disconnected from', socket.id)
    })
  }

  io.on('connect', IOHandler)

  console.info('Socket IO started...')
}
