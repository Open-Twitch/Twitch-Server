import { type RequestHandler } from 'express'
import rateLimit from 'express-rate-limit'

export const appLimiter: RequestHandler = rateLimit({
    windowMs: 1 * 1000,
    max: 10000,
    handler: (_, res) => {
        res.status(429).json({
            message:
                'There are too many requests to the server. please try again later.',
        })
    },
})
