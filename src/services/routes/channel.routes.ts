import { Router } from 'express'
import {
    readSingleChannel,
    readSingleChannelSchema,
    validateParams,
} from '@/services/index.js'

export const channelRouter = Router()

const CHANNEL_BASE = '/channel'

channelRouter.get(
    `${CHANNEL_BASE}/:channelId`,
    validateParams(readSingleChannelSchema),
    readSingleChannel
)

export const channelRoutes = channelRouter
