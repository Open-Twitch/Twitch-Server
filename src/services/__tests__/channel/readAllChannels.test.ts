import request from 'supertest'
import mongoose from 'mongoose'
import { loadDotenv } from './../../../configs/dotEnv/index'
import { ChannelModel, UserModel } from './../../models/index.js'
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'
import { channel } from 'diagnostics_channel'

loadDotenv()

const port = process.env.PORT ?? 5000
const url = process.env.DB_URI as string

describe('GET /api/channels', () => {
    let channelId1: string
    let channelId2: string
    let userId1: string
    let userId2: string

    beforeAll(async () => {
        await mongoose.connect(url)

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

        const user1 = await UserModel.create({
            username: 'userTest1',
            channel: channelId1,
            email: 'testChannel1@ex.com',
            password: 'testChnl1',
        })

        const user2 = await UserModel.create({
            username: 'userTest2',
            channel: channelId2,
            email: 'testChannel2@ex.com',
            password: 'testChnl2',
        })

        userId1 = user1._id
        userId2 = user2._id
    })

    it('reads all active channels successfully', async () => {
        const response = await request(`http://localhost:${port}`)
            .get('/api/channels')
            .expect(200)

        expect(Array.isArray(response.body)).toBe(true)
        expect(
            response.body.every((item: any) => typeof item === 'object')
        ).toBe(true)
    })

    afterAll(async () => {
        await ChannelModel.findByIdAndDelete(channelId1)
        await ChannelModel.findByIdAndDelete(channelId2)
        await UserModel.findByIdAndDelete(userId1)
        await UserModel.findByIdAndDelete(userId2)
        await mongoose.connection.close()
    })
})
