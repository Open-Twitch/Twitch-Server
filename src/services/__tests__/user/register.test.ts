import { UserModel } from './../../models/user.model'
import { loadDotenv } from './../../../configs/dotEnv/index'
import mongoose from 'mongoose'
import request from 'supertest'
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'

loadDotenv()

const port = process.env.PORT ?? 5000
const url = process.env.DB_URI as string

describe('POST /api/register', () => {
    const newUser = {
        username: `testuser`,
        email: `test@example.com`,
        password: `password123`,
    }

    beforeAll(async () => {
        await mongoose.connect(url)
    })

    it('registers a new user with valid data', async () => {
        const response = await request(`http://localhost:${port}`)
            .post('/api/auth/register')
            .send(newUser)

        expect(response.statusCode).toBe(201)

        expect(response.body.message).toBe('User registered successfully.')

        expect(response.body.token).toBeDefined()
    })

    it('returns an error message for registration with existing email', async () => {
        const response = await request(`http://localhost:${port}`)
            .post('/api/auth/register')
            .send(newUser)

        expect(response.statusCode).toBe(400)

        expect(response.body.message).toBe(
            'The provided email is already registered.'
        )
    })

    afterAll(async () => {
        await UserModel.deleteOne({ email: newUser.email })
        await mongoose.connection.close()
    })
})
