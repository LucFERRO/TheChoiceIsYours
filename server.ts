require('dotenv').config()

const express = require('express')
const { Router } = require('express')
const app = express()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const port = process.env.PORT || 3000

const router = Router()

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'The Choice Is Yours API',
            description: 'JWT + Refresh token',
            contact: {
                name: 'L'
            },
            // servers: [{ url: '/api' }]
            servers: [{
                url:`http://localhost:${port}`,
                description: 'localhost'
            },],
        },
    },
    apis: [`./routes/*.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use(express.json())

app.get('/', (req, res) => {
    // res.render('index')
    res.send('Swagger: /api/v1/docs');
})

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/users', userRoutes)
app.use('/auth', authRoutes)

app.listen(port, () => console.log(`Listening on port ${port}...`))