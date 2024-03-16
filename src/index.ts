import app from '@/app.js'
const port = process.env.PORT ?? 5000

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
        `Listening: http://localhost:${port} on mode ${
            process.env.NODE_ENV as string
        }`
    )
})
