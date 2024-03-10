import { Router } from 'express'
import { authRoutes, channelRoutes } from '@/services/index.js'

const routes = Router()

routes.use(authRoutes)
routes.use(channelRoutes)

export const appRoutes = routes
