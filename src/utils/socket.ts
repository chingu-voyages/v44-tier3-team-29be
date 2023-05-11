import {
  IClientToServerEvents,
  IInterServerEvents,
  IServerToClientEvents,
  ISocketData,
  ISocketPool,
  TEmitEvent,
  TSocketPayload
} from '@/types/socket'
import { Server as IOServer, Socket } from 'socket.io'
import { Server } from 'http'
import { v4 } from 'uuid'

export const initIOServer = (server: Server) => {
  const socketPool: ISocketPool = {}
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

    socket.on(
      'handshake',
      (cb: (uid: string, userSockets: string[]) => void) => {
        console.info('Handshake received from>>>', socket.id)

        const connected = Object.values(socketPool).includes(socket.id)

        if (connected) {
          console.info('This user has already connected.')
          const uid = getUid(socket.id)

          if (uid) {
            console.info('Sending callback for reconnect...')
            cb(uid, Object.values(socketPool))
            return
          }
        }

        const uid = v4()
        socketPool[uid] = socket.id

        console.info('Sending callback for handshake...')
        cb(uid, Object.values(socketPool))

        sendMessage(
          'user_connected',
          Object.values(socketPool).filter(
            (id) => id !== socket.id
          ) as string[],
          Object.values(socketPool)
        )
      }
    )

    socket.on('disconnect', () => {
      console.info('Disconnected from', socket.id)

      const uid = getUid(socket.id)

      if (uid) {
        delete socketPool[uid]
        sendMessage('user_disconnected', Object.values(socketPool), socket.id)
      }
    })
  }

  const getUid = (id: string) =>
    Object.keys(socketPool).find((uid) => socketPool[uid] === id)

  const sendMessage = (
    name: TEmitEvent,
    userSockets: string[],
    payload: TSocketPayload
  ) => {
    console.info('Emmitting event>>>' + name + ' to ', userSockets)

    switch (name) {
      case 'user_connected':
        userSockets.forEach((id) => {
          io.to(id).emit('user_connected', payload)
        })
        break
      case 'user_disconnected':
        userSockets.forEach((id) => {
          io.to(id).emit('user_disconnected', payload)
        })
        break
      default:
        return
    }
  }

  io.on('connect', IOHandler)

  console.info('Socket IO started...')
}
