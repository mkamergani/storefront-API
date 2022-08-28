import client from '../../database';
import { OrderStore } from '../../models/orderModel';
import { UserStore } from '../../models/userModel';
import { ProductStore } from '../../models/productModel';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Testing Order Model', () => {
    const product = {
        name: 'polo',
        price: 500,
        category: 'shirt',
    };
    const user = {
        firstname: 'mohamed',
        lastname: 'khalid',
        username: 'mk',
        password: '1234',
    };
    beforeAll(async () => {
        await userStore.create(user);
        await productStore.create(product);
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
            user_id: 1,
        });
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: '1',
        });
    });
    it('index method should return a list of Orders', async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                status: 'active',
                user_id: '1',
            },
        ]);
    });
    it('show method should return the correct Order', async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: '1',
        });
    });
    it('update method should update the Order', async () => {
        const result = await store.update(
            {
                status: 'complete',
                user_id: 1,
            },
            '1'
        );
        expect(result).toEqual({
            id: 1,
            status: 'complete',
            user_id: '1',
        });
    });
    it('add  Product method should add Order to the Order', async () => {
        const result = await store.addProduct(3, '1', '1');
        expect(result).toEqual({
            id: 1,
            quantity: 3,
            order_id: '1',
            product_id: '1',
        });
    });
    it('delete method should remove the Order', async () => {
        await store.create({
            status: 'active',
            user_id: '1',
        });
        await store.delete('2');
        const result = await store.index();
        expect(result.length).toEqual(1);
    });
});
