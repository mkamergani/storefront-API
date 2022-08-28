import supertest from 'supertest';
import app from '../../server';
import client from '../../database';

const request = supertest(app);

let token: string;
describe('Testing Products Handler Endpoints', () => {
    const product = {
        name: 'air jordan',
        price: 250,
        category: 'shoes',
    };
    const user = {
        firstName: 'mohamed',
        lastName: 'khalid',
        userName: 'mk',
        password: '1234',
    };
    beforeAll(async () => {
        const response = await request.post('/users').send(user);
        token = response.body;
    });

    afterAll(async () => {
        const connection = await client.connect();
        const products_sql =
            'DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;';
        const users_sql =
            'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(products_sql);
        await connection.query(users_sql);
        connection.release();
    });

    it('expects create endpoint to add a Product', async () => {
        const response = await request
            .post('/products')
            .set({ Authorization: `Bearer ${token}` })
            .send(product);

        expect(response.body).toEqual({
            id: 1,
            name: 'air jordan',
            price: 250,
            category: 'shoes',
        });
    });

    it('expects index endpoint to return list of products', async () => {
        const response = await request.get('/products');
        expect(response.body).toEqual([
            {
                id: 1,
                name: 'air jordan',
                price: 250,
                category: 'shoes',
            },
        ]);
    });

    it('expects show endpoint to return the correct Product', async () => {
        const response = await request.get('/products/1');
        expect(response.body).toEqual({
            id: 1,
            name: 'air jordan',
            price: 250,
            category: 'shoes',
        });
    });
    it('expects update endpoint to update the Product', async () => {
        const response = await request
            .put('/products/1')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                name: 'air jordan',
                price: 500,
                category: 'shoes',
            });
        expect(response.body).toEqual({
            id: 1,
            name: 'air jordan',
            price: 500,
            category: 'shoes',
        });
    });
    it('expects delete endpoint to delete the Product', async () => {
        const response = await request
            .delete('/products/1')
            .set({ Authorization: `Bearer ${token}` });
        expect(response.body).toEqual({
            id: 1,
            name: 'air jordan',
            price: 500,
            category: 'shoes',
        });
    });
});
