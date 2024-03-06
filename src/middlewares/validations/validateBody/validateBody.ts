import { type RequestHandler } from 'express'

export const validateBody =
    (schema: any): RequestHandler =>
    async (req, res, next) => {
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            next()
        } catch (err) {
            res.status(400).json(err)
        }
    }
