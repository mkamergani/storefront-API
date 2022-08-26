import { OrderStore } from '../../models/orderModel';
import { UserStore } from '../../models/userModel';

const store = new OrderStore();

describe('Testing Order Model', () => {
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
    it('create method should add an Order', async () => {
        const result = await store.create({
            status: 'active',
            userId: 1,
        });
        expect(result).toEqual({
            id: 1,
            status: 'active',
            userId: 1,
        });
    });
    it('index method should return a list of Orders', async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                status: 'active',
                userId: 1,
            },
        ]);
    });
    it('show method should return the correct Order', async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: 1,
            status: 'active',
            userId: 1,
        });
    });
    it('update method should update the Order', async () => {
        const result = await store.update(
            {
                status: 'complete',
                userId: 1,
            },
            '1'
        );
        expect(result).toEqual({
            id: 1,
            status: 'complete',
            userId: 1,
        });
    });
    it('delete method should remove the Order', async () => {
        await store.delete('1');
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
