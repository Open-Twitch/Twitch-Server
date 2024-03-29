import bcrypt from 'bcrypt'
import { UserModel } from './../../models/user.model'
import { loadDotenv } from './../../../configs/dotEnv/index'
import mongoose from 'mongoose'
import request from 'supertest'
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'

loadDotenv()

const port = process.env.PORT ?? 5000
const url = process.env.DB_URI as string

describe('POST /api/login', () => {
    const existingUser = {
        username: `existinguser`,
        password: `expassword`,
    }

    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash(existingUser.password, 10)
        await mongoose.connect(url)
        await UserModel.create({
            username: existingUser.username,
            email: `existinguseremaildfdfklkjtydrhtgsd@gmail.com`,
            password: hashedPassword,
        })
    })

    it('logs in an existing user with valid credentials', async () => {
        const response = await request(`http://localhost:${port}`)
            .post('/api/auth/login')
            .send(existingUser)

        expect(response.statusCode).toBe(200)

        expect(response.body.message).toBe('Login successful.')

        expect(response.body.token).toBeDefined()
    })

    it('returns an error message for login with invalid credentials', async () => {
        const invalidUser = {
            username: 'nontuser',
            password: 'invalidpass',
        }

        const response = await request(`http://localhost:${port}`)
            .post('/api/auth/login')
            .send(invalidUser)

        expect(response.statusCode).toBe(400)

        expect(response.body.message).toBe('Invalid username or password.')
    })

    afterAll(async () => {
        await UserModel.deleteOne({ username: existingUser.username })
        await mongoose.connection.close()
    })
})
