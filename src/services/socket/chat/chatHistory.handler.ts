import { ChannelModel } from '@/services/index.js'
import type * as SocketIO from 'socket.io'

export const emitChatHistory = async (
    socket: SocketIO.Socket,
    channelId: string
): Promise<boolean | undefined> => {
    try {
        const channel =
            await ChannelModel.findById(channelId).populate('messages')

        if (channel) {
            return socket.emit('chat-history', {
                channelId,
                messages: channel.messages.map((m: any) => ({
                    author: m.author,
                    content: m.content,
                })),
            })
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
