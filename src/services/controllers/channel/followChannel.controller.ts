import i18n from 'i18n'
import { type RequestHandler } from 'express'
import { UserModel } from '@/services/index.js'

export const followChannel: RequestHandler = async (req, res, next) => {
    try {
        const { channelId } = req.body
        const { userId } = req.user

        const user = await UserModel.findById(userId, 'followedChannels')

        if (!user) {
            return res.status(404).json({ message: i18n.__('userNotFound') })
        }

        if (user.followedChannels.includes(channelId)) {
            return res
                .status(404)
                .json({ message: i18n.__('alreadyFollowingChannel') })
        }

        user.followedChannels.push(channelId)

        await user.save()

        return res.status(200).json({
            message: i18n.__('followedSeuccessfully'),
        })
    } catch (error) {
        next(error)
    }
}
