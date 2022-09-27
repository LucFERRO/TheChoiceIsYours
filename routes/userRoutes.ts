const { Router } = require('express')
const userController = require('../controller/userController')
const bcrypt = require('bcrypt')
const pool = require('../database/db-local')
const queries = require('../queries/queries')
import { Request, Response, NextFunction } from 'express'
import { User } from '../types/types'

const router = Router();

//A GERER
// const users = [
//     {
//         "username": "Test",
//         "password": "1234",
//         "firstname": "Test",
//         "lastname": "Ttttest",
//         "date_of_birth": "01-01-2005",
//         "email": "test@ttes.fr"
//     }
// ]



router.get('/', userController.getUsers)

router.post('/', userController.postUser)

router.post('/login', userController.login)

module.exports = router