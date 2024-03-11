import I18n from 'i18n'
import { type RequestHandler } from 'express'
import { UserModel } from '@/services/index.js'

export const readChannelSettigns: RequestHandler = async (req, res, next) => {
    try {
        const { userId } = req.user

        const userData = await UserModel.findById(
            userId,
            'channel username'
        ).populate('channel')

        if (!userData) {
            return res.status(400).json({ message: I18n.__('userNotFound') })
        }

        if (!userData.channel) {
            return res
                .status(400)
                .json({ message: I18n.__('readSingleChannelNotFound') })
        }

        return res.status(201).json({
            id: userData.channel._id,
            username: userData?.username,
            title: userData.channel.title,
            description: userData.channel.description,
            avatarUrl: userData.channel.avatarURL,
            streamKey: userData.channel.streamKey,
        })
    } catch (error) {
        next(error)
    }
}
