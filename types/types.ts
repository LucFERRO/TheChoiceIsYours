
import { Response, NextFunction } from 'express'

declare global {
    namespace Express {
      interface Request {
        headers?: Headers;
        user?: Users;
        body?: Body;
      }
    }
  }

interface Users{
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
