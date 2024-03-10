import { type RequestHandler } from 'express'
import { type ObjectSchema } from 'joi'

export const validateParams =
    (schema: ObjectSchema): RequestHandler =>
    async (req, res, next) => {
        try {
            await schema.validateAsync(req.params)
            next()
        } catch (err) {
            res.status(400).json(err)
        }
    }
