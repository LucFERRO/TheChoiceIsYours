import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
const queries = require('../queries/queries')
const pool = require('../database/db-local')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export {};

// type Request = {
//     headers: Headers;
//     user: {
//         name: string;
//         username: string;
//         password: string;
//     };
//     body: {
//         name: string;
//         username: string;
//         password: string;
//         token: string;
//     };
// }

const getUsers = (req : Request, res : Response) => {
    pool.query(queries.getUsers, (error : Error, result : any) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}

const postUserz = async (req : Request, res : Response) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        const user = {name:req.body.name, password: hashedPassword}
        res.status(201).send('User created')
    } catch {
        res.status(500).send()
    }
}

// const postUser = (req :Request, res: Response) => {
//     const { name, mail, description, image } = req.body
//     //Add
//     pool.query(queries.addTemplate, [name, mail, description, image], (error:ErrorRequestHandler, result:any) => {
//         if(error) throw error
//         res.status(200).send("Created Succesfully!")
//     })
// }

const postUser = async (req : Request, res : Response) => {
    try {
        const { username, firstname, lastname, date_of_birth, email, profile_picture } = req.body
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        pool.query(queries.addUser, [username, hashedPassword, firstname, lastname, date_of_birth, email, profile_picture], (error : ErrorRequestHandler, result : any) => {
            if(error) throw error
            res.status(200).send("Created Succesfully!")
        })
    } catch {
        res.sendStatus(500)
    }
}


module.exports = {
    getUsers,
    postUser,
}