import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
const queries = require('../queries/queries')
const pool = require('../database/db-local')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req : Request, res : Response) => {

    pool.query(queries.getUsers, async (error : Error, result : any) => {
        if (error) throw error

        let users = result.rows

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
}

    module.exports = {
        login
}