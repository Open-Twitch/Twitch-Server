import request from 'supertest'
import mongoose from 'mongoose'
import { UserModel } from '../../../services/models/user.model'
import { describe, expect, it, afterAll } from '@jest/globals'
import app from '../../../app'

describe('POST /api/register', () => {
    const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
    }

    it('registers a new user with valid data', async () => {
        const response = await request(app).post('/api/register').send(newUser)

        expect(response.statusCode).toBe(201)

        expect(response.body.message).toBe('User registered successfully')

        expect(response.body.token).toBeDefined()
    })

    it('returns an error message for registration with existing email', async () => {
        const response = await request(app).post('/api/register').send(newUser)

        expect(response.statusCode).toBe(400)

        expect(response.body.message).toBe('Email is already registered')
    })

    afterAll(async () => {
        await UserModel.deleteOne({ email: newUser.email })

        await mongoose.connection.close()
    })
})
