import { Router } from 'express'
import { loginSchema, registerSchema } from '@/services/utils/index.js'
import { loginUser, registerUser } from '@/services/controllers/index.js'
import { validateBody } from '@/services/middlewares/index.js'

export const authRouter = Router()

const AUTH_BASE = '/auth'

authRouter.post(
    `${AUTH_BASE}/register`,
    validateBody(registerSchema),
    registerUser
)

authRouter.post(`${AUTH_BASE}/login`, validateBody(loginSchema), loginUser)

export const authRoutes = authRouter
