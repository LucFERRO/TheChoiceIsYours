require('dotenv').config()

const express = require('express')
const { Router } = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API',
            description: '',
            contact: {
                name: 'Best front-end dev EUW'
            },
            // servers: [{ url: '/api' }]
            servers: [{
                url:`http://localhost:3000`,
                description: 'localhost'
            },],
        },
    },
    apis: [`./routes/*.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const userController = require('./controller/userController')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')

import { Request, Response, NextFunction } from 'express'
import { User } from './types/types'

const router = Router()
app.use(express.json())

const posts = [
    {
        username: 'Luc',
        title: 'test1'
    },
    {
        username: 'Gaetan',
        title: 'J"adore le CSS'
    },
    {
        username: 'Luc2',
        title: 'test2'
    }
]

app.get('/', (req : Request, res : Response) => {
    res.send('Root du super projet en TypeScript')
})

app.get('/posts', authenticateToken, (req : Request,res : Response) => {
    res.json(posts.filter(post => post.username === req.user.username))
})

function authenticateToken(req : Request, res : Response, next : NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send('No token given')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('Not logged in')
        req.user = user
        next()
    })
}

app.use('/users', userRoutes)
app.use('/auth', authRoutes)



app.listen(3000, () => console.log(`Listening on port 3000...`))