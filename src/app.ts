import swaggerUi from 'swagger-ui-express'
import express from 'express'
import cors from 'cors'
import appRoot from 'app-root-path'
import {
    connectDB,
    devConfigs,
    i18nConfig,
    errorHandler,
    serveSwaggerJson,
    loadDotenv,
} from '@/configs/index.js'
import {
    appLimiter,
    specs,
    userlimiter,
    handleNotFound,
    appRoutes,
} from '@/services/index.js'
import compression from 'compression'

const app = express()

loadDotenv()

connectDB()

devConfigs(app)

app.use(cors())
app.use(i18nConfig)
app.use(userlimiter)
app.use(appLimiter)
app.use(compression())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(appRoot.resolve('/src/public')))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.get('/swagger.json', serveSwaggerJson)

app.use('/api', appRoutes)

app.use(handleNotFound)

app.use(errorHandler)

export default app
