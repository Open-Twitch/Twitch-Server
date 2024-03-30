import { Router } from 'express'
import {
    authorize,
    readChannelSettigns,
    // updateChannelSettingsSchema,
    updateChannelSettings,
    validateBody,
    updateSettingsPassword,
    updateSettingsPasswordSchema,
} from '@/services/index.js'

const settingsRouter = Router()

const SETTINGS_BASE = '/settings'

settingsRouter.get(`${SETTINGS_BASE}`, authorize, readChannelSettigns)

settingsRouter.put(
    `${SETTINGS_BASE}`,
    authorize,
    // validateBody(updateChannelSettingsSchema),
    updateChannelSettings
)

settingsRouter.patch(
    `${SETTINGS_BASE}/password`,
    authorize,
    validateBody(updateSettingsPasswordSchema),
    updateSettingsPassword
)

export const settingsRoutes = settingsRouter
