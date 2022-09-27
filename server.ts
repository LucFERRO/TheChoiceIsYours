require('dotenv').config()

const express = require('express')
const { Router } = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const swaggerJsDoc = require('swagger-jsdoc')
// const swaggerUi = require('swagger-ui-express')

const userController = require('./controller/controller')

import { Request, Response, NextFunction } from 'express'

declare global {
    namespace Express {
      interface Request {
        headers?: Headers;
        body?: Body;
        user?: User;
      }
    }
  }

interface User{
    name: string;
    username: string;
    password: string;
}
interface Body{
    name: string;
    username: string;
    password: string;
    token: string;
}

// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: 'API',
//             description: '',
//             contact: {
//                 name: 'Best front-end dev EUW'
//             },
//             // servers: [{ url: '/api' }]
//             servers: [{
//                 url:`http://localhost:3000`,
//                 description: 'localhost'
//             },],
//         },
//     },
//     apis: [`./routes/*.js`]
// }

// const swaggerDocs = swaggerJsDoc(swaggerOptions)
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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

const users = []

app.get('/', (req : Request, res : Response) => {
    res.send('Root du super projet en TypeScript')
})

app.get('/posts', authenticateToken, (req : Request,res : Response) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.get('/users', userController.getUsers)

app.post('/users', userController.postUser)

app.post('/users/login', async (req : Request, res : Response) => {
    const user = users.find(user => user.name == req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Wrong password')
        }
    } catch {
        res.status(500).send()
    }
})

let refreshTokens = []

app.post('/token', (req : Request, res : Response) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err : Error, user : User) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })
})

app.delete('/logout', (req : Request, res : Response) => {
    refreshTokens = refreshTokens.filter( token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/login', (req : Request, res : Response) => {

    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken})
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

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
}

app.listen(3000, () => console.log(`Listening on port 3000...`))