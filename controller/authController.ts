import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
const queries = require('../queries/queries')
const pool = require('../database/db-local')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



module.exports = {

}