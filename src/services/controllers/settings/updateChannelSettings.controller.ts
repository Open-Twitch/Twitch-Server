import I18n from 'i18n'
import { type RequestHandler } from 'express'
import { ChannelModel, UserModel } from '@/services/index.js'

export const updateChannelSettings: RequestHandler = async (req, res, next) => {
    try {
        const { userId } = req.user

        const { username, description, title, avatarURL } = req.body

        const userData = await UserModel.findById(userId, 'username channel')

        if (!userData) {
            return res.status(404).json({ message: I18n.__('userNotFound') })
        }

        if (!userData.channel) {
            return res
                .status(404)
                .json({ message: I18n.__('readSingleChannelNotFound') })
        }

        if (username !== userData.username) {
            userData.username = username
            await userData.save()
        }

        const channelData = await ChannelModel.findByIdAndUpdate(
            userData.channel,
            {
                title,
                description,
                avatarURL,
                isActive: true,
            },
            { new: true }
        ).lean()

        return res.status(201).json({
            ...channelData,
        })
    } catch (error) {
        next(error)
    }
}
