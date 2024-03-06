import { type Request } from 'express'
import type { AdaptRequestType } from '../types/adaptRequest.types.js'

export const adaptRequest = <T>(
    req: Request
): Readonly<AdaptRequestType<T>> => {
    return Object.freeze({
        path: req.path,
        method: req.method,
        pathParams: req.params,
        queryParams: req.query,
        body: req.body,
        user: req.user,
        files: req.files,
    })
}
