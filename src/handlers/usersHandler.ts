import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/userModel';
import verifyAuthToken from '../util/verifyToken';
import jwt, { Secret } from 'jsonwebtoken';

const store = new UserStore();

const userRoutes = (app: express.Application) => {
    app.post('/users/authenticate', authenticate);
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
    app.put('/users/:id', verifyAuthToken, update);
    app.delete('/users/:id', verifyAuthToken, destroy);
};

const authenticate = async (req: Request, res: Response) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;
        const user = await store.authenticate(userName, password);
        if (user) {
            let token = jwt.sign(
                { user: user },
                process.env.TOKEN_SECRET as Secret
            );
            res.json(token);
        } else {
            res.status(401);
            res.json('Invalid User Name or Password');
        }
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};
const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (_req: Request, res: Response) => {
    try {
        const user = await store.show(_req.params.id);
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        username: req.body.userName,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user);
        let token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as Secret
        );
        res.json(token);
    } catch (err) {
        res.status(400);
        res.send(err);
    }
};

const update = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        username: req.body.userName,
        password: req.body.password,
    };
    try {
        const updatedUser = await store.update(user, req.params.id);
        res.json(updatedUser);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (_req: Request, res: Response) => {
    try {
        const deletedUser = await store.delete(_req.params.id);
        res.json(deletedUser);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export default userRoutes;
