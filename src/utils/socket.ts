import {
  IClientToServerEvents,
  IInterServerEvents,
  IServerToClientEvents,
  ISocketData
} from '@/types/socket'
import { Server as IOServer, Socket } from 'socket.io'
import { Server } from 'http'
import { v4 } from 'uuid'

export const initIOServer = (server: Server) => {
  const users: any = {}
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

    socket.on('handshake', (cb: (uid: string, users: string[]) => void) => {
      console.info('Handshake received from>>>', socket.id)

      const connected = Object.values(users).includes(socket.id)

      if (connected) {
        console.info('This user has already connected.')
        const uid = getUid(socket.id)

        if (uid) {
          console.info('Sending callback for reconnect...')
          cb(uid, Object.values(users))
          return
        }
      }

      const uid = v4()
      users[uid] = socket.id

      console.info('Sending callback for handshake...')
      cb(uid, Object.values(users))

      sendMessage(
        'user_connected',
        Object.values(users).filter((id) => id !== socket.id) as string[],
        Object.values(users)
      )
    })

    socket.on('disconnect', () => {
      console.info('Disconnected from', socket.id)

      const uid = getUid(socket.id)

      if (uid) {
        delete users[uid]
        sendMessage('user_disconnected', Object.values(users), socket.id)
      }
    })
  }

  const getUid = (id: string) =>
    Object.keys(users).find((uid) => users[uid] === id)

  const sendMessage = (name: string, users: string[], payload: any) => {
    console.info('Emmitting event>>>' + name + ' to ', users)
    users.forEach((id) => {
      io.to(id).emit(name, payload)
    })
  }

  io.on('connect', IOHandler)

  console.info('Socket IO started...')
}
