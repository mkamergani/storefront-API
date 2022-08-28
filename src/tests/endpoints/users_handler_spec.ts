import supertest from 'supertest';
import app from '../../server';
import client from '../../database';

const request = supertest(app);

let token: string;

describe('Testing Users Handler Endpoints', () => {
    const user = {
        firstName: 'mohamed',
        lastName: 'khalid',
        userName: 'mk',
        password: '1234',
    };

    afterAll(async () => {
        const connection = await client.connect();
        const users_sql =
            'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(users_sql);
        connection.release();
    });

    it('expects create endpoint to add a User', async () => {
        const response = await request.post('/users').send(user);
        expect(response.status).toEqual(200);
    });
    it('expects authenticate endpoint to sign a User', async () => {
        const response = await request.post('/users/authenticate').send({
            userName: user.userName,
            password: user.password,
        });
        token = response.body;
        expect(response.status).toEqual(200);
    });
    it('expects index endpoint to return list of Users', async () => {
        const response = await request
            .get('/users')
            .set({ Authorization: `Bearer ${token}` });
        expect(response.body).toEqual([
            {
                id: 1,
                firstname: 'mohamed',
                lastname: 'khalid',
                username: 'mk',
            },
        ]);
    });

    it('expects show endpoint to return the correct User', async () => {
        const response = await request
            .get('/users/1')
            .set({ Authorization: `Bearer ${token}` });
        expect(response.body).toEqual({
            id: 1,
            firstname: 'mohamed',
            lastname: 'khalid',
            username: 'mk',
        });
    });

    it('expects update endpoint to update the User', async () => {
        const response = await request
            .put('/users/1')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                firstName: 'mohamed',
                lastName: 'mergani',
                userName: 'mk',
                password: '1234',
            });
        expect(response.body.lastname).toEqual('mergani');
    });
    it('expects delete endpoint to delete the user', async () => {
        const response = await request
            .delete('/users/1')
            .set({ Authorization: `Bearer ${token}` });
        expect(response.body.firstname).toEqual('mohamed');
    });
});
