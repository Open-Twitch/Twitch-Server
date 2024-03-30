import { Router } from 'express'
import {
    authorize,
    readAllChannels,
    readFollowedChannels,
    followChannel,
    readSingleChannel,
    readSingleChannelSchema,
    validateBody,
    validateParams,
} from '@/services/index.js'

const channelRouter = Router()

const CHANNEL_BASE = '/channels'

channelRouter.post(
    `${CHANNEL_BASE}`,
    authorize,
    validateBody(readSingleChannelSchema),
    followChannel
)

channelRouter.get(
    `${CHANNEL_BASE}/:channelId`,
    validateParams(readSingleChannelSchema),
    readSingleChannel
)

channelRouter.get(`${CHANNEL_BASE}`, readAllChannels)

channelRouter.get(`${CHANNEL_BASE}-follow`, authorize, readFollowedChannels)

export const channelRoutes = channelRouter
