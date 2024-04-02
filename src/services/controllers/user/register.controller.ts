import jwt from 'jsonwebtoken'
import i18n from 'i18n'
import bcrypt from 'bcrypt'
import { type RequestHandler } from 'express'
import {
    UserModel,
    type IUserType,
    type IUserSchema,
    adaptRequest,
    ChannelModel,
} from '@/services/index.js'

export const registerUser: RequestHandler = async (req, res, next) => {
    try {
        const { username, email, password }: IUserType = adaptRequest(req).body

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res
                .status(400)
                .json({ message: i18n.__('emailAlreadyRegistered') })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newChannel = await ChannelModel.create({})

        const newUser: IUserSchema = new UserModel({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            channel: newChannel._id,
        })

        await newUser.save()

        const token = jwt.sign(
            { userId: newUser._id },
            String(process.env.JWT_SECRET),
            { expiresIn: '8h' }
        )

        res.cookie('token', token, {
            maxAge: 8 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return res
            .status(201)
            .json({ message: i18n.__('userRegisteredSuccessfully'), token })
    } catch (error) {
        next(error)
    }
}
