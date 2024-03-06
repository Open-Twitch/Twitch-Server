import { type RequestHandler } from 'express'
import type Joi from 'joi'

export const validateBody =
    (schema: Joi.ObjectSchema): RequestHandler =>
    async (req, res, next) => {
        try {
            await schema.validateAsync(req.body)
            next()
        } catch (err) {
            res.status(400).json(err)
        }
    }
