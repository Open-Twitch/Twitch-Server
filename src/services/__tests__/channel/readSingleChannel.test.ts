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

describe('GET /api/channels/:channelId', () => {
    let token: string
    let userId: string
    let channelId: string

    beforeAll(async () => {
        await mongoose.connect(url)

        const user = await UserModel.create({
            username: 'testUser',
            email: 'testsglech@ex.com',
            password: 'password123',
        })

        const channel = await ChannelModel.create({
            isActive: true,
            title: 'Test Channel',
            description: 'Test channel description',
            avatarURL: 'test_avatar.jpg',
            streamKey: 'test_stream_key',
            messages: [],
        })

        user.channel = channel._id
        await user.save()

        token = jwt.sign({ userId: user._id }, secret, { expiresIn: '8h' })
        userId = user._id
        channelId = channel._id
    })

    it('reads single channel successfully', async () => {
        const response = await request(`http://localhost:${port}`)
            .get(`/api/channels/${channelId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body).toHaveProperty('_id')
        expect(response.body).toHaveProperty('title', 'Test Channel')
        expect(response.body).toHaveProperty(
            'description',
            'Test channel description'
        )
        expect(response.body).toHaveProperty('avatarURL', 'test_avatar.jpg')
        expect(response.body).toHaveProperty('streamKey', 'test_stream_key')
        expect(response.body).toHaveProperty('username', 'testUser')
        expect(typeof response.body.isOnline === 'boolean').toBeTruthy()
        expect(response.body.streamURL).toBeDefined()
    })

    it('returns 404 if channel or user not found', async () => {
        await ChannelModel.findByIdAndDelete(channelId)

        const response = await request(`http://localhost:${port}`)
            .get(`/api/channels/${channelId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)

        expect(response.body.message).toBe('Channel not found.')
    })

    afterAll(async () => {
        await UserModel.findByIdAndDelete(userId)
        await mongoose.connection.close()
    })
})
