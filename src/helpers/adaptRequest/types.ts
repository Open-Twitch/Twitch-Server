import { type Request } from 'express'

export interface AdaptRequestType<T extends Request['body']> {
    path: Request['path']
    method: Request['method']
    pathParams: Request['params']
    queryParams: Request['query']
    body: T
    user: any
    files: any
}
