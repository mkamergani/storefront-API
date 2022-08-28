import { ProductStore } from '../../models/productModel';
import client from '../../database';

const store = new ProductStore();

describe('Testing Product Model', () => {
    const product = {
        name: 'air jordan',
        price: 250,
        category: 'shoes',
    };
    afterAll(async () => {
        const connection = await client.connect();
        const products_sql =
            'DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;';
        await connection.query(products_sql);
        connection.release();
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
    it('create method should add a Product', async () => {
        const result = await store.create(product);
        expect(result).toEqual({
            id: 1,
            name: 'air jordan',
            price: 250,
            category: 'shoes',
        });
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'air jordan',
                price: 250,
                category: 'shoes',
            },
        ]);
    });
    it('show method should return the correct Product', async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: 1,
            name: 'air jordan',
            price: 250,
            category: 'shoes',
        });
    });
    it('update method should update the Product', async () => {
        const result = await store.update(
            {
                name: 'air jordan',
                price: 500,
                category: 'shoes',
            },
            '1'
        );
        expect(result).toEqual({
            id: 1,
            name: 'air jordan',
            price: 500,
            category: 'shoes',
        });
    });
    it('delete method should remove the Product', async () => {
        await store.delete('1');
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
