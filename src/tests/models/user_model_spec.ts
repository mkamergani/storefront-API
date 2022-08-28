import { User, UserStore } from '../../models/userModel';
import client from '../../database';

const store = new UserStore();

describe('Testing User Model', () => {
    const user = {
        firstname: 'mohamed',
        lastname: 'khalid',
        username: 'mk',
        password: '1234',
    };

    afterAll(async () => {
        const connection = await client.connect();
        const users_sql =
            'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(users_sql);
        connection.release();
    });
    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a User', async () => {
        const result = await store.create(user);
        expect(result.firstname).toEqual('mohamed');
    });
    it('index method should return a list of Users', async () => {
        const result = await store.index();
        expect(result.length).toEqual(1);
    });
    it('show method should return the correct User', async () => {
        const result: User = (await store.show('1')) as User;
        expect(result.lastname).toEqual('khalid');
    });
    it('update method should update the User', async () => {
        const result = await store.update(
            {
                firstname: 'mohamed',
                lastname: 'mergani',
                username: 'mk',
                password: '1234',
            },
            '1'
        );
        expect(result.lastname).toEqual('mergani');
    });
    it('Authenticate method should return a User', async () => {
        const result: User = (await store.authenticate('mk', '1234')) as User;
        expect(result.firstname).toEqual('mohamed');
    });
    it('delete method should remove the User', async () => {
        await store.delete('1');
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
