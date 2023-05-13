export interface IServerToClientEvents {
  user_connected: (payload: TSocketPayload) => void
  user_disconnected: (payload: TSocketPayload) => void
  system_message: (payload: string) => void
}

export interface IClientToServerEvents {
  hello: () => void
}

export interface IInterServerEvents {
  ping: () => void
}

export interface ISocketData {
  name: string
  age: number
}

export interface ISocketPool {
  [userId: string]: string
}

export type TSocketPayload = string | string[]

export type TEmitEvent = keyof IServerToClientEvents
