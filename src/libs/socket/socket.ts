import {
  IServerToClientEvents,
  ISocketData,
  ISocketPool
} from '@/libs/socket/ISocket'
import { Server as IOServer, Socket } from 'socket.io'
import { Server } from 'http'
import { connectionHanlder } from './connectionHandler'
import { notificaitonHandler } from './notificationHandler'
import passport from '../Passport'
import { NextFunction, Request, Response } from 'express'

export const socketPool: ISocketPool = {}

export const startIOServer = (server: Server) => {
  const io = new IOServer<IServerToClientEvents, ISocketData>(server, {
    cors: {
      origin: '*'
    }
  })

  // auth middleware

  // io.engine.use((req: Request, res: Response, next: NextFunction) => {
  //   passport.authenticate('jwt', { session: false })(req, res, next)
  // })

  const onConnection = (socket: Socket) => {
    console.info('Message received from>>>', socket.id)

    connectionHanlder(io, socket)
    notificaitonHandler(io, socket)
  }

  io.on('connect', onConnection)

  console.info('Socket IO started...')
}
