require('dotenv').config()

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username: 'Luc',
        title: 'test1'
    },
    {
        username: 'Luc2',
        title: 'test2'
    }
]

const users = []

app.get('/posts', authenticateToken, (req,res) => {
    res.json(posts.filter(post => post.username === req.user.username))
})

app.get('/users', (req,res) => {
    res.json(users)
})

app.post('/users', async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        const user = {name:req.body.username, password: hashedPassword}
        users.push(user)
        res.status(201).send('User created')
    } catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req,res) => {
    const user = users.find(user => user.username == req.body.username)
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

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send('No token given')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('Not logged in')
        req.user = user
        next()
    })
}

app.listen(3000, () => console.log(`Listening on port 3000...`))