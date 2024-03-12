import Joi from 'joi'

export const updateSettingsPasswordSchema = Joi.object({
    password: Joi.string().min(6).max(12),
    newPassword: Joi.string().min(6).max(12),
})
