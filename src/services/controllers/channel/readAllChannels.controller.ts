import i18n from 'i18n'
import { type RequestHandler } from 'express'
import { ChannelModel, UserModel } from '@/services/index.js'
import axios from 'axios'

export const readAllChannels: RequestHandler = async (_req, res, next) => {
    try {
        const channels = await ChannelModel.find(
            { isActive: true },
            '_id title avatarURL'
        )

        if (!channels || channels.length === 0) {
            return res
                .status(404)
                .json({ message: i18n.__('readAllChannelsNotFound') })
        }

        const channelData = await Promise.all(
            channels.map(async (channel) => {
                const user = await UserModel.findOne(
                    { channel: channel._id },
                    'username'
                )

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

                return {
                    ...(channel.toObject ? channel.toObject() : channel),
                    username: user ? user.username : '',
                    isOnline,
                }
            })
        )

        return res.status(200).json(channelData)
    } catch (error) {
        next(error)
    }
}
