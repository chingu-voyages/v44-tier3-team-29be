import { Document } from "mongoose";

export interface IUserInfo extends Document {
    userId: string
    nickname: string
    createdAt: Date
    updatedAt: Date
}