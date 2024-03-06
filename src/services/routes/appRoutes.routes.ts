import { Router } from 'express'
import { authRoutes } from './index.js'

const routes = Router()

routes.use(authRoutes)

export const appRoutes = routes
