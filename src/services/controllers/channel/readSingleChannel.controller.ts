import i18n from 'i18n'
import { type RequestHandler } from 'express'
import { ChannelModel, UserModel } from '@/services/index.js'
import axios from 'axios'

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

        const streamURL = `http://localhost:8000/live/${channel.streamKey}.flv`

        const activeStreams: any = (
            await axios.get('http://localhost:8000/api/streams')
        ).data

        const liveStreams = []

        for (const streamId in activeStreams.live) {
            if (
                activeStreams.live[streamId].publisher &&
                activeStreams.live[streamId].publisher !== null
            ) {
                liveStreams.push(streamId)
            }
        }

        const isOnline = liveStreams.includes(channel.streamKey)

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
