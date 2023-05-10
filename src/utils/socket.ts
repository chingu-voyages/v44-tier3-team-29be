import {
  IClientToServerEvents,
  IInterServerEvents,
  IServerToClientEvents,
  ISocketData
} from '@/types/socket'
import { Server as IOServer, Socket } from 'socket.io'
import { Server } from 'http'

export const initIOServer = (server: Server) => {
  let users: string[] = []
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

      const connected = users.includes(socket.id)

      if (connected) {
        console.info('This user has already connected.')
        const uid = getUid(socket.id)

        if (uid) {
          console.info('Sending callback for reconnect...')
          cb(uid, users)
          return
        }
      }

      const uid = '123'
      users.push(uid)

      console.info('Sending callback for handshake...')
      cb(uid, users)

      sendMessage(
        'user_connected',
        users.filter((id) => id !== socket.id),
        users
      )
    })

    socket.on('disconnect', () => {
      console.info('Disconnected from', socket.id)

      const uid = getUid(socket.id)

      if (uid) {
        users = users.filter((value: string) => value !== uid)
        sendMessage('user_disconnected', users, uid)
      }
    })
  }

  const getUid = (id: string) => users.find((value: string) => value === id)

  const sendMessage = (name: string, users: string[], payload?: any) => {
    console.info('Emmitting event>>>' + name + ' to ', users)
    users.forEach((id) => {
      payload
        ? io.to(id).emit('sendMessage', name, payload)
        : io.to(id).emit('notify', name)
    })
  }

  io.on('connect', IOHandler)

  console.info('Socket IO started...')
}
