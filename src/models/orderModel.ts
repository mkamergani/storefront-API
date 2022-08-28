import client from '../database';

export type Order = {
    id?: number;
    status: string;
    user_id: number | string;
};

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot get Orders ${err}`);
        }
    }

    async show(id: string): Promise<Order | string> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            if (result.rowCount === 0) {
                return 'Order Not Found';
            }
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot show Order ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const connection = await client.connect();
            const sql =
                'INSERT INTO orders(status, user_id) VALUES($1, $2) RETURNING *';
            const result = await connection.query(sql, [o.status, o.user_id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot create Order ${err}`);
        }
    }

    async update(o: Order, id: string): Promise<Order> {
        try {
            const connection = await client.connect();
            const sql =
                'UPDATE orders SET status=($1), user_id=($2) WHERE id=($3) RETURNING *';

            const result = await connection.query(sql, [
                o.status,
                o.user_id,
                id,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot update Order ${err}`);
        }
    }
    async addProduct(quantity: number, orderId: string, productId: string) {
        try {
            const connection = await client.connect();
            const sql =
                'INSERT INTO order_products(quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const result = await connection.query(sql, [
                quantity,
                orderId,
                productId,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot Add Product ${err}`);
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const connection = await client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot delete Order ${err}`);
        }
    }
}
