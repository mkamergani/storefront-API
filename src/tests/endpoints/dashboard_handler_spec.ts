import supertest from 'supertest';
import app from '../../server';
import client from '../../database';
import { ProductStore } from '../../models/productModel';
import { OrderStore } from '../../models/orderModel';

const request = supertest(app);
const productStore = new ProductStore();
const orderStore = new OrderStore();

let token: string;
describe('Testing Dashboard Handler Endpoints', () => {
    const product = {
        name: 'polo',
        price: 500,
        category: 'shirt',
    };
    const user = {
        firstName: 'mohamed',
        lastName: 'khalid',
        userName: 'mk',
        password: '1234',
    };
    const order = {
        status: 'active',
        user_id: 1,
    };
    beforeAll(async () => {
        await productStore.create(product);
        const response = await request.post('/users').send(user);
        token = response.body;
        await orderStore.create(order);
    });
    afterAll(async () => {
        const connection = await client.connect();
        const products_sql =
            'DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;';
        const orders_sql =
            'DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
        const users_sql =
            'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(products_sql);
        await connection.query(orders_sql);
        await connection.query(users_sql);
        connection.release();
    });

    it('expects userOrders endpoint to return list of a user Orders', async () => {
        const response = await request
            .get('/users/1/orders/?status=active')
            .set({ Authorization: `Bearer ${token}` });
        expect(response.body).toEqual([
            {
                id: 1,
                status: 'active',
                user_id: '1',
            },
        ]);
    });
    it('expects orderCategories endpoint to return list of products in a category', async () => {
        const response = await request
            .get('/products_categories?category=shirt')
            .set({ Authorization: `Bearer ${token}` });
        expect(response.body).toEqual([
            {
                id: 1,
                name: 'polo',
                price: 500,
                category: 'shirt',
            },
        ]);
    });
});
