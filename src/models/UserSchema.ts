import { Model, Schema } from 'mongoose'
import { IUser } from './contracts/IUser'
import { IUserInfo } from './contracts/IUserInfo'

import DB from '../libs/DB'

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  username: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const UserInfoSchema = new Schema<IUserInfo>({
  userId: { type: String, required: true },
  nickname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const UserModel: Model<IUser> = DB.model<IUser>('User', UserSchema)
export const UserInfoModel: Model<IUserInfo> = DB.model<IUserInfo>(
  'UserInfo',
  UserInfoSchema
)
