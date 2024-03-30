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

describe('GET /api/channels-follow', () => {
    let token: string
    let userId: string
    let channelId1: string
    let channelId2: string

    beforeAll(async () => {
        await mongoose.connect(url)

        const user = await UserModel.create({
            username: 'testUser',
            email: 'testch@ex.com',
            password: 'password123',
            followedChannels: [],
        })

        const channel1 = await ChannelModel.create({
            isActive: true,
            title: 'Channel test 1',
            avatarURL: 'avatar1.jpg',
        })
        const channel2 = await ChannelModel.create({
            isActive: true,
            title: 'Channel test 2',
            avatarURL: 'avatar2.jpg',
        })

        channelId1 = channel1._id
        channelId2 = channel2._id

        user.followedChannels = [channel1, channel2]
        await user.save()

        token = jwt.sign({ userId: user._id }, secret, { expiresIn: '8h' })
        userId = user._id
    })

    it('reads followed channels successfully', async () => {
        const response = await request(`http://localhost:${port}`)
            .get('/api/channels-follow')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body.followedChannels).toHaveLength(2)
        expect(response.body.followedChannels[0]).toHaveProperty('_id')
        expect(response.body.followedChannels[0]).toHaveProperty(
            'title',
            'Channel test 1'
        )
        expect(response.body.followedChannels[1]).toHaveProperty('_id')
        expect(response.body.followedChannels[1]).toHaveProperty(
            'title',
            'Channel test 2'
        )
    })

    it('returns 404 if user not found', async () => {
        await UserModel.findByIdAndDelete(userId)
        await ChannelModel.findByIdAndDelete(channelId1)
        await ChannelModel.findByIdAndDelete(channelId2)

        const response = await request(`http://localhost:${port}`)
            .get('/api/channels-follow')
            .set('Authorization', `Bearer ${token}`)
            .expect(404)

        expect(response.body.message).toBe('User not found')
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})
