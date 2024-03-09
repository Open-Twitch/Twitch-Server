import { Router } from 'express'
import { validateBody } from '../index.js'
import { loginSchema, registerSchema } from './shemas.js'

export const authRouter = Router()

const AUTH_BASE = '/auth'

/**
 * @swagger
 * /api/auth/register:
 *     post:
 *         tags: [Authentication]
 *         summary: Register a new user
 *         description: Register a new user with username, email and password.
 *         parameters:
 *           -  username:
 *              type: string
 *              in: json
 *           -  email:
 *              type: string
 *              in: json
 *           -  password:
 *              type: string
 *              in: json
 *         responses:
 *             200:
 *                 description: Registration successful
 *             400:
 *                 description: Bad Request
 *             500:
 *                 description: Internal Server Error
 */
authRouter.post(`${AUTH_BASE}/register`, validateBody(registerSchema))

/**
 * @swagger
 * /api/auth/login:
 *     post:
 *         tags: [Authentication]
 *         summary: Login a user
 *         description: Login a user with username and password.
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             username:
 *                                 type: string
 *                             password:
 *                                 type: string
 *         responses:
 *             200:
 *                 description: Login successful
 *             400:
 *                 description: Bad Request
 *             500:
 *                 description: Internal Server Error
 */
authRouter.post(`${AUTH_BASE}/login`, validateBody(loginSchema))

export const authRoutes = authRouter
