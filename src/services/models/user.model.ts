import { type Document, Schema, model } from 'mongoose'

export interface IUserType {
    username: string
    email: string
    password: string
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
})

export const UserModel = model<IUserSchema>('User', UserSchema)
