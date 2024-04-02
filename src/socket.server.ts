import type * as SocketIO from 'socket.io'
import { emitChatHistory, emitChatMessage } from '@/services/index.js'

// const onlineUsersMap = new Map<string, SocketIO.Socket>()

export default function (socket: SocketIO.Socket): void {
    // emit chat history
    socket.on('chat-history', (channelId) => {
        emitChatHistory(socket, channelId)
    })

    // emit chat message
    socket.on('chat-message', (data) => {
        emitChatMessage(socket, {
            toChannel: data.toChannel,
            message: data.message,
        })
    })
}
