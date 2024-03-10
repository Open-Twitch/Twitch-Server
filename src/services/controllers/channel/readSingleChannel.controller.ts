import i18n from 'i18n'
import { type RequestHandler } from 'express'
import { ChannelModel, UserModel } from '@/services/index.js'

export const readSingleChannel: RequestHandler = async (req, res, next) => {
    try {
        const { channelId } = req.params
        const channel = await ChannelModel.findById(channelId)

        const user = await UserModel.findOne({ channel: channelId }, 'username')

        if (!channel?.isActive || !user) {
            return res
                .status(404)
                .json({ message: i18n.__('readSingleChannelNotFound') })
        }

        const isOnline = false

        const streamURL = 'http'

        return res.status(200).json({
            ...(channel.toObject ? channel.toObject() : channel),
            username: user.username,
            isOnline,
            streamURL,
        })
    } catch (error) {
        next(error)
    }
}
