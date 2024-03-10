import Joi from 'joi'

export const readSingleChannelSchema = Joi.object({
    channelId: Joi.string().required(),
})
