import { Router } from 'express'
import {
    readAllChannels,
    readSingleChannel,
    readSingleChannelSchema,
    validateParams,
} from '@/services/index.js'

const channelRouter = Router()

const CHANNEL_BASE = '/channels'

channelRouter.get(
    `${CHANNEL_BASE}/:channelId`,
    validateParams(readSingleChannelSchema),
    readSingleChannel
)

channelRouter.get(`${CHANNEL_BASE}`, readAllChannels)

export const channelRoutes = channelRouter
