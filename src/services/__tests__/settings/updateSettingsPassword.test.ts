import request from 'supertest'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { loadDotenv } from '../../../configs/dotEnv/index'
import { UserModel } from '../../models/index.js'
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'

loadDotenv()

const port = process.env.PORT ?? 5000
const url = process.env.DB_URI as string
const secret = process.env.JWT_SECRET as string

describe('PATCH /api/settings/password', () => {
    let token: string
    let userId: string

    beforeAll(async () => {
        await mongoose.connect(url)

        const hashedPassword = await bcrypt.hash('password123', 10)
        const user = await UserModel.create({
            username: 'testUser',
            email: 'testPass@exa.com',
            password: hashedPassword,
        })

        token = jwt.sign({ userId: user._id }, secret, { expiresIn: '8h' })
        userId = user._id
    })

    it('updates user password successfully', async () => {
        const newPassword = 'newPass'

        const response = await request(`http://localhost:${port}`)
            .patch('/api/settings/password')
            .set('Authorization', `Bearer ${token}`)
            .send({
                password: 'password123',
                newPassword,
            })
            .expect(201)

        expect(response.body.message).toBe('Password changed successfully')

        const updatedUser = await UserModel.findById(userId)
        const isPasswordCorrect = await bcrypt.compare(
            newPassword,
            updatedUser?.password || ''
        )
        expect(isPasswordCorrect).toBe(true)
    })

    it('returns 400 if password is incorrect', async () => {
        const response = await request(`http://localhost:${port}`)
            .patch('/api/settings/password')
            .set('Authorization', `Bearer ${token}`)
            .send({
                password: 'wrongPass',
                newPassword: 'newPass',
            })
            .expect(400)

        expect(response.body.message).toBe('Invalid password')
    })

    it('returns 404 if user not found', async () => {
        await UserModel.findByIdAndDelete(userId)

        const response = await request(`http://localhost:${port}`)
            .patch('/api/settings/password')
            .set('Authorization', `Bearer ${token}`)
            .send({
                password: 'password123',
                newPassword: 'newPass',
            })
            .expect(404)

        expect(response.body.message).toBe('User not found')
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})
