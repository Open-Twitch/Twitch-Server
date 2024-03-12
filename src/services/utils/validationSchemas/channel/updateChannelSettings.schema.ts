import Joi from 'joi'

export const updateChannelSettingsSchema = Joi.object({
    username: Joi.string().min(3).max(12),
    description: Joi.string().min(10).max(200),
    title: Joi.string().min(3).max(30),
    avatarURL: Joi.string().uri().required(),
})
