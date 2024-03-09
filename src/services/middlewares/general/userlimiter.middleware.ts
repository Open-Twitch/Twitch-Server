import { type RequestHandler } from 'express'
import rateLimit from 'express-rate-limit'

export const userlimiter: RequestHandler = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    keyGenerator: (req) => req.ip ?? 'unknown',
    handler: (_, res) => {
        res.status(429).json({
            message: 'This user has too many requests. please try again later.',
        })
    },
})
