import jwt from 'jsonwebtoken'
import { type RequestHandler } from 'express'

export const authorize: RequestHandler = (req: any, res, next: any) => {
    let token: string =
        req.body.token ||
        req.query.token ||
        req.header('Authorization') ||
        req.cookies.token ||
        ''

    if (!token) {
        res.status(403).json({
            message: 'A token is required!',
        })
    }

    try {
        token = token.replace(/^Bearer\s+/, '')
        const verified = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = verified

        next()
    } catch (error: any) {
        res.status(401).json({
            message: 'invalid token !',
        })
    }
}
