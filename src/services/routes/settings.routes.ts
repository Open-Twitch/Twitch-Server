import { Router } from 'express'
import { authorize, readChannelSettigns } from '@/services/index.js'

const settingsRouter = Router()

const SETTINGS_BASE = '/channel'

settingsRouter.get(`${SETTINGS_BASE}`, authorize, readChannelSettigns)

export const settingsRoutes = settingsRouter
