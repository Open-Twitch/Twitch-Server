import { type Request, type Response, type NextFunction } from 'express'
import createError from 'http-errors'

// TODO (asked by mahdi from sina): Separate these functions and make them modular and write code documentation

class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message)
        this.name = 'AppError'
    }
}

export const errorHandler = (err: Error, res: Response): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            err,
        })
    }
}

export const errorHandling = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    const statusCode =
        error instanceof createError.HttpError ? error.status : 500
    const message = error.message || 'Internal Server Error'

    res.status(statusCode).json({
        error: {
            status: statusCode,
            message,
        },
    })
}
