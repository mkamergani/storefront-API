import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';
import verifyAuthToken from '../util/verifyToken';
const dashboard = new DashboardQueries();

const dashboardRoutes = (app: express.Application) => {
    app.get('/users/:id/orders', verifyAuthToken, userOrders);
    app.get('/products_categories', verifyAuthToken, productCategories);
};

const userOrders = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const status: string = req.query.status as string;
    try {
        const orders = await dashboard.userOrders(userId, status);
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const productCategories = async (req: Request, res: Response) => {
    const category: string = req.query.category as string;
    try {
        const products = await dashboard.productCategories(category);
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export default dashboardRoutes;
