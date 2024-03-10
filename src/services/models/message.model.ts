import { type Document, Schema, model } from 'mongoose'

export interface IMessageType {
    author: string
    content: string
    date: Date
}

export type IMessageSchema = Document & IMessageType

const MessageSchema = new Schema<IMessageSchema>({
    author: {
        type: String,
    },
    content: {
        type: String,
    },
    date: {
        type: Date,
    },
})

export const MessageModel = model<IMessageSchema>('Message', MessageSchema)
