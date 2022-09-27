const { Router } = require('express')
const userController = require('../controller/userController')
const bcrypt = require('bcrypt')
const pool = require('../database/db-local')
const queries = require('../queries/queries')
import { Request, Response, NextFunction } from 'express'
import { User } from '../types/types'

const router = Router();

// Users


/**
 * @swagger
 * tags:
 *      name: Users
 *      description: Manage users
 */

/**
 * @swagger
 * /users:
 *  get:
 *      tags: [Users]
 *      description: Request all users
 *      summary: 
 */
router.get('/', userController.getUsers)

/**
 * @swagger
 * /users:
 *  post:
 *      tags: [Users]
 *      description: Add a user
 *      summary: 
 */
router.post('/', userController.postUser)


module.exports = router