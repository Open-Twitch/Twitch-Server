import { type Document, Schema, model } from 'mongoose'

export interface IUserType {
    username: string
    email: string
    password: string
    channel: Schema.Types.ObjectId
    folowedChannels: Schema.Types.ObjectId[]
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
    folowedChannels: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Channel',
        },
    ],
})

export const UserModel = model<IUserSchema>('User', UserSchema)
