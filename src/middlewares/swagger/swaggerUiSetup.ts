import swaggerJSDoc from 'swagger-jsdoc'

const options = {
    swaggerDefinition: {
        info: {
            title: 'Shop Swagger ',
            version: '2.0.0',
            description:
                'This is the swagger documentation for the twitch application.',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Shop',
                url: 'https://logrocket.com',
                email: 'info@email.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                specs: 'User',
            },
        ],
    },
    apis: ['./src/api/v1/services/routes/*.ts'],
}

export const specs = swaggerJSDoc(options)
