export interface User {
    username: string;
    password: string;
}

interface Body {
    username: string;
    password: string;
    token: string;
}

declare global {
    namespace Express {
      interface Request {
        headers?: Headers;
        body?: Body;
        user?: User;
      }
    }
  }
