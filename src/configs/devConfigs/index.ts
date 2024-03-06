import type { Express } from 'express'
import morgan from 'morgan'

export const devConfigs = (app: Express): null | unknown => {
    if (process.env.NODE_ENV !== 'development') return null
    /**
     * HTTP logger config
     * @morgan
     **/
    app.use(morgan('dev'))
}
