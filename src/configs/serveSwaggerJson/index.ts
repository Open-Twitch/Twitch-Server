import { type Request, type Response } from 'express'
import { specs } from '../../services/index.js'

export const serveSwaggerJson = (_req: Request, res: Response): any => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
}
