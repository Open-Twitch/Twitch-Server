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

describe('PUT /api/settings', () => {
    let token: string
    let userId: string
    let channelId: string

    beforeAll(async () => {
        await mongoose.connect(url)

        const user = await UserModel.create({
            username: 'testSetUser',
            email: 'testSet@eg.com',
            password: 'password',
        })

        token = jwt.sign({ userId: user._id }, secret, { expiresIn: '8h' })
        userId = user._id

        const channel = await ChannelModel.create({
            isActive: true,
            title: 'Test',
            description: 'Test description',
            avatarURL: 'test.jpg',
            streamKey: 'Test',
            messages: [],
        })

        channelId = channel._id

        user.channel = channelId
        await user.save()
    })

    it('updates channel settings successfully', async () => {
        const newSettings = {
            username: 'newUser',
            title: 'New Test',
            description: 'New Test description',
            avatarURL: 'newTest.jpg',
        }

        const response = await request(`http://localhost:${port}`)
            .put('/api/settings')
            .set('Authorization', `Bearer ${token}`)
            .send(newSettings)
            .expect(201)

        expect(response.body.title).toBe(newSettings.title)
        expect(response.body.description).toBe(newSettings.description)
        expect(response.body.avatarURL).toBe(newSettings.avatarURL)
    })

    it('returns 400 if user not found', async () => {
        await UserModel.findByIdAndDelete(userId)

        const response = await request(`http://localhost:${port}`)
            .put('/api/settings')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: 'newUser',
                title: 'New Test',
                description: 'New Test description',
                avatarURL: 'new_Test.jpg',
            })
            .expect(404)

        expect(response.body.message).toBe('User not found')
    })

    afterAll(async () => {
        await ChannelModel.findByIdAndDelete(channelId)
        await mongoose.connection.close()
    })
})
