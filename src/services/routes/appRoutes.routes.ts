import { Router } from 'express'
import { authRoutes, channelRoutes, settingsRoutes } from '@/services/index.js'

const routes = Router()

routes.use(authRoutes)
routes.use(channelRoutes)
routes.use(settingsRoutes)

export const appRoutes = routes
