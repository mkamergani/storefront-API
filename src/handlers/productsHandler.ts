import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/productModel';
import verifyAuthToken from '../util/verifyToken';

const store = new ProductStore();

const productsRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.put('/products/:id', verifyAuthToken, update);
    app.delete('/products/:id', verifyAuthToken, destroy);
};

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (_req: Request, res: Response) => {
    try {
        const product = await store.show(_req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const update = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const updatedProduct = await store.update(product, req.params.id);
        res.json(updatedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await store.delete(req.params.id);
        res.json(deletedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export default productsRoutes;
