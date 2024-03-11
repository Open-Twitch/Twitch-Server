import { type Document, Schema, model } from 'mongoose'

export interface IUserType {
    username: string
    email: string
    password: string
    channel: any
    followedChannels: any[]
}

export type IUserSchema = Document & IUserType

const UserSchema = new Schema<IUserSchema>({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
    },
    followedChannels: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Channel',
        },
    ],
})

export const UserModel = model<IUserSchema>('User', UserSchema)
