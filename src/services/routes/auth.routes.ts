import { Router } from 'express'
import { validateBody } from '../index.js'
import { loginSchema, registerSchema } from './shemas.js'

export const authRouter = Router()

const AUTH_BASE = '/auth'

authRouter.post(`${AUTH_BASE}/register`, validateBody(registerSchema))
authRouter.post(`${AUTH_BASE}/login`, validateBody(loginSchema))

export const authRoutes = authRouter
