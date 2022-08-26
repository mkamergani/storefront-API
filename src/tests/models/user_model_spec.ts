import { UserStore } from '../../models/userModel';

const store = new UserStore();
describe('Testing User Model', () => {
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
        await store.create({
            firstName: 'mohamed',
            lastName: 'khalid',
            userName: 'mk',
            password: '1234',
        });
        const result = await store.index();
        expect(result.length).toEqual(1);
    });
    it('index method should return a list of Users', async () => {
        const result = await store.index();
        expect(result.length).toEqual(1);
    });
    it('show method should return the correct User', async () => {
        const result = await store.show('2');
        expect(result).toEqual('User Not Found');
    });

    it('delete method should remove the User', async () => {
        await store.delete('1');
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
