import mongoose from 'mongoose'

// export const connestDB = async (): Promise<void> => {
//     try {
//         const db = await mongoose.connect(process.env.DB_URI as string)
//         // eslint-disable-next-line no-console
//         console.log(`mongodb connected : ${db.connection.host}`)
//     } catch (error) {
//         // eslint-disable-next-line no-console
//         console.log(error)
//         process.exit(1)
//     }
// }
export const connectDB = async (): Promise<void> => {
    try {
        const db = await mongoose.connect(process.env.DB_URI as string)

        mongoose.connection.on('connected', () => {
            // eslint-disable-next-line no-console
            console.log('mongoose connected to DB')
        })

        mongoose.connection.on('disconnected', () => {
            // eslint-disable-next-line no-console
            console.log('mongoose disconnected ')
        })

        process.on('SIGINT', async () => {
            await mongoose.connection.close()
            process.exit(0)
        })

        // eslint-disable-next-line no-console
        console.log(`mongodb connected : ${db.connection.host}`)
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('db is not conected', error)
        process.exit(1)
    }
}
