import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot get Products ${err}`);
        }
    }

    async show(id: string): Promise<Product | string> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            if (result.rowCount === 0) {
                return 'Product Not Found';
            }
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot show product ${err}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql =
                'INSERT INTO products(name, price, category)' +
                `VALUES($1, $2, $3) RETURNING *`;
            const result = await connection.query(sql, [
                p.name,
                p.price,
                p.category,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot create product ${err}`);
        }
    }

    async update(p: Product, id: string): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql =
                'UPDATE products SET name=($1), price=($2), category=($3) WHERE id=($4) RETURNING *';

            const result = await connection.query(sql, [
                p.name,
                p.price,
                p.category,
                id,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot update Order ${err}`);
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot delete product ${err}`);
        }
    }
}
