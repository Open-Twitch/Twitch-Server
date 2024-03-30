import request from 'supertest'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { loadDotenv } from './../../../configs/dotEnv/index'
import { UserModel, ChannelModel } from './../../models/index.js'
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'

loadDotenv()

const port = process.env.PORT ?? 5000
const url = process.env.DB_URI as string
const secret = process.env.JWT_SECRET as string

describe('GET /api/settings', () => {
    let token: string
    let userId: string
    let channelId: string

    beforeAll(async () => {
        await mongoose.connect(url)

        const user = await UserModel.create({
            username: 'testUser',
            email: 'testi@example.com',
            password: 'password',
        })

        token = jwt.sign({ userId: user._id }, secret, { expiresIn: '8h' })
        userId = user._id

        const channel = await ChannelModel.create({
            title: 'Test Channel',
            description: 'Test channel description',
            avatarURL: 'test_avatar.jpg',
            streamKey: 'test_stream_key',
            isActive: true,
        })

        channelId = channel._id

        user.channel = channelId
        await user.save()
    })

    it('returns channel settings successfully', async () => {
        const response = await request(`http://localhost:${port}`)
            .get('/api/settings')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body.id).toBe(channelId.toString())
        expect(response.body.username).toBe('testUser')
        expect(response.body.title).toBe('Test Channel')
        expect(response.body.description).toBe('Test channel description')
        expect(response.body.avatarUrl).toBe('test_avatar.jpg')
        expect(response.body.streamKey).toBe('test_stream_key')
    })

    it('returns 400 if user not found', async () => {
        await UserModel.findByIdAndDelete(userId)

        const response = await request(`http://localhost:${port}`)
            .get('/api/settings')
            .set('Authorization', `Bearer ${token}`)
            .expect(404)

        expect(response.body.message).toBe('User not found')
    })

    afterAll(async () => {
        await ChannelModel.findByIdAndDelete(channelId)
        await mongoose.connection.close()
    })
})
