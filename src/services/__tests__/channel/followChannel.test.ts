import request from 'supertest'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { loadDotenv } from './../../../configs/dotEnv/index'
import { UserModel } from './../../models/user.model'
import { ChannelModel } from './../../models/channel.model'
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'

loadDotenv()

const port = process.env.PORT ?? 5000
const url = process.env.DB_URI as string
const secret = process.env.JWT_SECRET as string

describe('POST /api/follow', () => {
    let token: string
    let userId: string
    let channelId: string

    beforeAll(async () => {
        await mongoose.connect(url)

        const user = await UserModel.create({
            username: 'test2user',
            email: 'test2@example.com',
            password: 'password2',
        })

        token = jwt.sign({ userId: user._id }, secret, { expiresIn: '8h' })
        userId = user._id

        const channel = await ChannelModel.create({
            isActive: true,
            title: 'Test Channel',
            description: 'Test channel description',
            avatarURL: 'test_avatar.jpg',
            streamKey: 'test_stream_key',
            messages: [],
        })

        channelId = channel._id
    })

    it('follows a channel successfully', async () => {
        const response = await request(`http://localhost:${port}`)
            .post('/api/channels')
            .set('Authorization', `Bearer ${token}`)
            .send({ channelId })

        expect(response.statusCode).toBe(200)

        expect(response.body.message).toBe('Followed successfully')

        const updatedUser = await UserModel.findById(userId)
        expect(updatedUser?.followedChannels.includes(channelId)).toBe(true)
    })

    it('returns an error message for following an already followed channel', async () => {
        const response = await request(`http://localhost:${port}`)
            .post('/api/channels')
            .set('Authorization', `Bearer ${token}`)
            .send({ channelId })

        expect(response.statusCode).toBe(404)

        expect(response.body.message).toBe(
            'You are already following this channel'
        )
    })

    afterAll(async () => {
        await UserModel.findByIdAndDelete(userId)
        await ChannelModel.findByIdAndDelete(channelId)
        await mongoose.connection.close()
    })
})
