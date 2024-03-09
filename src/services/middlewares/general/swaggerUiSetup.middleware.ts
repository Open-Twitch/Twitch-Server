import swaggerJSDoc from 'swagger-jsdoc'

const options = {
    swaggerDefinition: {
        info: {
            title: 'Open Twitch Swagger ',
            version: '2.0.0',
            description:
                'This is the swagger documentation for the twitch clone application.',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Twitch',
                url: 'https://logrocket.com',
                email: 'info@email.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                specs: 'Client',
            },
        ],
    },
    apis: ['./src/services/routes/auth.routes.ts'],
}

export const specs = swaggerJSDoc(options)
