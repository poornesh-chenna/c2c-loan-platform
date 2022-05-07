import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
const options = {
    swagger: '2.0',
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express Library API',
        },
    },
    apis: [path.join(path.resolve(), 'routers', '*.js')],
}

export const SwaggerSpecs = swaggerJSDoc(options)
