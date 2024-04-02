import { type Document, Schema, model } from 'mongoose'
import { uuid } from 'uuidv4'

export interface IChannelType {
    isActive: boolean
    title: string
    description: string
    avatarURL: string
    streamKey: string
    messages: Schema.Types.ObjectId[]
}

export type IChannelSchema = Document & IChannelType

const ChannelSchema = new Schema<IChannelSchema>({
    isActive: {
        type: Boolean,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    avatarURL: {
        type: String,
        default: 'none',
    },
    streamKey: {
        type: String,
        default: uuid,
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
            default: [],
        },
    ],
})

export const ChannelModel = model<IChannelSchema>('Channel', ChannelSchema)
