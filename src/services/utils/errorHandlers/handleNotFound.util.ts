import { type Request, type Response, type NextFunction } from 'express'
import createError from 'http-errors'

/**
 * @desc    Middleware to handle not found routes in Express
 * @param   {Request} req - The Express request object
 * @param   {Response} res - The Express response object
 * @param   {NextFunction} next - The Express next function
 */

export const handleNotFound = (
    _req: Request,
    _res: Response,
    next: NextFunction
): void => {
    next(createError.NotFound('Page not found.'))
}
