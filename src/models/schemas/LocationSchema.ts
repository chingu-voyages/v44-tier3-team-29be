import { Schema, model } from 'mongoose'

interface ILocation {
  latitude: number
  longitude: number
}

const LocationSchema = new Schema<ILocation>({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
})

export const Location = model<ILocation>('Location', LocationSchema)
