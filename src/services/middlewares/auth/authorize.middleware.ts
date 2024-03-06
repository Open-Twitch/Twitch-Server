import jwt from 'jsonwebtoken'
import { type RequestHandler } from 'express'
import { errorHandling } from '../../index.js'

export const authorize: RequestHandler = (req: any, res, next) => {
    const token: string = req.header('token') ?? ''
    if (!token)
        res.status(401).json({
            message: 'invalid token !',
        })
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = verified
        next()
    } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        next(errorHandling(error, req, res, next))
    }
}
