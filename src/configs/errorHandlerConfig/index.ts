import { type Request, type Response, type NextFunction } from 'express'
import createError from 'http-errors'

export const errorHandler = (
    error: createError.HttpError,
    _req: Request,
    res: Response,
    _next: NextFunction
): any => {
    const serverError = createError.InternalServerError()
    const statusCode = error.status || serverError.status
    const message = error.message || serverError.message
    return res.status(statusCode).json({
        errors: {
            statusCode,
            message,
        },
    })
}
