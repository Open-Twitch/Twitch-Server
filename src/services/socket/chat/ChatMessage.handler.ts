import { ChannelModel, MessageModel } from '@/services/index.js'
import type * as SocketIO from 'socket.io'

export const emitChatMessage = async (
    socket: SocketIO.Socket,
    {
        toChannel,
        message,
    }: {
        toChannel: string
        message: {
            content: string
            author: string
        }
    }
): Promise<boolean | undefined> => {
    try {
        const channel = await ChannelModel.findById(toChannel)

        if (channel) {
            const newMessage = new MessageModel({
                content: message.content,
                author: message.author,
                date: new Date(),
            })

            await newMessage.save()

            channel.messages.push(newMessage._id)
            await channel.save()
        }

        return socket.emit('chat-history', {
            message: 'channel not found',
        })
    } catch (error) {
        return socket.emit('chat-history', {
            message: 'Server error',
        })
    }
}
