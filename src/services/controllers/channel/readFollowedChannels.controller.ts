import i18n from 'i18n'
import { type RequestHandler } from 'express'
import { UserModel } from '@/services/index.js'

export const readFollowedChannels: RequestHandler = async (req, res, next) => {
    try {
        const { userId } = req.user

        const user = await UserModel.findOne(
            { userId },
            'followedChannels'
        ).populate('followedChannels')

        if (!user) {
            return res.status(404).json({ message: i18n.__('userNotFound') })
        }

        return res.status(200).json({
            followedChannels: user.followedChannels,
        })
    } catch (error) {
        next(error)
    }
}
