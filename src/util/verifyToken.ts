import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authHeader: string = req.headers.authorization as string;
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.TOKEN_SECRET as string);

        next();
    } catch (err) {
        res.status(401);
        res.json('unAuthorized, Invalid Token');
    }
};

export default verifyAuthToken;
