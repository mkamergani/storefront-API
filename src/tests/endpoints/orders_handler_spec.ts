import supertest from 'supertest';
import app from '../../server';
import client from '../../database';
import { ProductStore } from '../../models/productModel';

const request = supertest(app);
const productStore = new ProductStore();

let token: string;
describe('Testing Orders Handler Endpoints', () => {
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
    beforeAll(async () => {
        await productStore.create(product);
        const response = await request.post('/users').send(user);
        token = response.body;
    });
    afterAll(async () => {
        const connection = await client.connect();
        const order_products_sql =
            'DELETE FROM order_products; \n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;';
        const products_sql =
            'DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;';
        const orders_sql =
            'DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
        const users_sql =
            'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(order_products_sql);
        await connection.query(products_sql);
        await connection.query(orders_sql);
        await connection.query(users_sql);
        connection.release();
    });
    it('expects create endpoint to add an Order', async () => {
        const response = await request
            .post('/orders')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                status: 'active',
                userId: 1,
            });

        expect(response.body).toEqual({
            id: 1,
            status: 'active',
            user_id: '1',
        });
    });

    it('expects index endpoint to return list of Orders', async () => {
        const response = await request.get('/orders');
        expect(response.body).toEqual([
            {
                id: 1,
                status: 'active',
                user_id: '1',
            },
        ]);
    });

    it('expects show endpoint to return the correct Order', async () => {
        const response = await request.get('/orders/1');
        expect(response.body).toEqual({
            id: 1,
            status: 'active',
            user_id: '1',
        });
    });
    it('expects update endpoint to update the Order', async () => {
        const response = await request
            .put('/orders/1')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                status: 'complete',
                userId: '1',
            });
        expect(response.body).toEqual({
            id: 1,
            status: 'complete',
            user_id: '1',
        });
    });
    it('expects add product endpoint to add product the Order', async () => {
        const response = await request
            .post('/orders/1/products')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                productId: '1',
                quantity: 3,
            });
        expect(response.body).toEqual({
            id: 1,
            quantity: 3,
            order_id: '1',
            product_id: '1',
        });
    });
    it('expects delete endpoint to delete the Product', async () => {
        await request
            .post('/orders')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                status: 'active',
                userId: 1,
            });
        const response = await request
            .delete('/orders/2')
            .set({ Authorization: `Bearer ${token}` });
        expect(response.body).toEqual({
            id: 2,
            status: 'active',
            user_id: '1',
        });
    });
});
