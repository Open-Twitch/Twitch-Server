import { Server, type Socket } from 'socket.io'
import socketServer from './socket.server.js'
import app from '@/app.js'

const port = process.env.PORT ?? 5000

const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
        `Listening: http://localhost:${port} on mode ${
            process.env.NODE_ENV as string
        }`
    )
})

const io: any = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CLINT_ENDPOINT,
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket: Socket) => {
    // eslint-disable-next-line no-console
    console.info('Socket io connected successfully.')
    socketServer(socket)
})
