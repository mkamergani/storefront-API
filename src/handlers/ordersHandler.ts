import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orderModel';
import verifyAuthToken from '../util/verifyToken';
const store = new OrderStore();

const ordersRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', verifyAuthToken, create);
    app.put('/orders/:id', verifyAuthToken, update);
    app.post('/orders/:id/products', verifyAuthToken, addProduct);
    app.delete('/orders/:id', verifyAuthToken, destroy);
};

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (_req: Request, res: Response) => {
    try {
        const order = await store.show(_req.params.id);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    const order: Order = {
        status: req.body.status,
        userId: req.body.userId,
    };
    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const update = async (req: Request, res: Response) => {
    const order: Order = {
        status: req.body.status,
        userId: req.body.userId,
    };
    try {
        const updatedOrder = await store.update(order, req.params.id);
        res.json(updatedOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
    try {
        const addedProduct = await store.addProduct(
            quantity,
            orderId,
            productId
        );
        res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req: Request, res: Response) => {
    try {
        const deletedOrder = await store.delete(req.params.id);
        res.json(deletedOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export default ordersRoutes;
