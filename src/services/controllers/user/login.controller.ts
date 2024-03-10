import jwt from 'jsonwebtoken'
import i18n from 'i18n'
import bcrypt from 'bcrypt'
import { type RequestHandler } from 'express'
import { UserModel, type IUserType, adaptRequest } from '@/services/index.js'

export const loginUser: RequestHandler = async (req, res, next) => {
    try {
        const { username, password }: IUserType = adaptRequest(req).body

        const user = await UserModel.findOne({ username })

        if (!user) {
            return res
                .status(400)
                .json({ message: i18n.__('invalidCredentials') })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res
                .status(400)
                .json({ message: i18n.__('invalidCredentials') })
        }

        const token = jwt.sign(
            { userId: user._id },
            String(process.env.JWT_SECRET),
            { expiresIn: '8h' }
        )

        res.cookie('token', token, {
            maxAge: 8 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return res
            .status(200)
            .json({ message: i18n.__('loginSuccessful'), token })
    } catch (error) {
        next(error)
    }
}
