import { Server as IOServer, Socket } from 'socket.io'
import { v4 } from 'uuid'
import { socketPool } from './socket'
import { getUid, sendMessage } from './helpers'

export const connectionHanlder = (io: IOServer, socket: Socket) => {
  socket.on('handshake', (cb: (uid: string, userSockets: string[]) => void) => {
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

    const uid = socket.handshake.auth.uid
    if (!uid) {
      sendMessage(io, 'system_message', [socket.id], 'Please sign in...')
      socket.disconnect()
      return
    }
    // const uid = v4()
    socketPool[uid] = socket.id

    console.info('Sending callback for handshake...')
    cb(uid, Object.values(socketPool))

    const targetSockets = Object.values(socketPool).filter(
      (id) => id !== socket.id
    ) as string[]
    const payload = Object.values(socketPool)

    sendMessage(io, 'user_connected', targetSockets, payload)
  })

  socket.on('disconnect', () => {
    console.info('Disconnected from', socket.id)

    const uid = getUid(socket.id)

    if (uid) {
      delete socketPool[uid]

      const targetSockets = Object.values(socketPool)
      const payload = socket.id

      sendMessage(io, 'user_disconnected', targetSockets, payload)
    }
  })
}
