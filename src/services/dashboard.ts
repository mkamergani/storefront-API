import client from '../database';
import { Order } from '../models/orderModel';
import { Product } from '../models/productModel';

export class DashboardQueries {
    async userOrders(userId: string, status: string): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const sql =
                'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
            const result = await connection.query(sql, [userId, status]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot Get User Orders ${err}`);
        }
    }
    async productCategories(category: string): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await connection.query(sql, [category]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot Get Products ${err}`);
        }
    }
}
