import I18n from 'i18n'
import bcrypt from 'bcrypt'
import { type RequestHandler } from 'express'
import { UserModel } from '@/services/index.js'

export const updateSettingsPassword: RequestHandler = async (
    req,
    res,
    next
) => {
    try {
        const { userId } = req.user

        const { password, newPassword } = req.body

        const userData = await UserModel.findById(userId, 'password')

        if (!userData) {
            return res.status(404).json({ message: I18n.__('userNotFound') })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            userData.password
        )

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: I18n.__('invalidPassword') })
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10)

        userData.password = encryptedPassword

        await userData.save()

        return res.status(201).json({
            message: I18n.__('passwordChangedSuccessfully'),
            ...(userData.toObject ? userData.toObject() : userData),
        })
    } catch (error) {
        next(error)
    }
}
