import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
};
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UserStore {
    async authenticate(
        userName: string,
        password: string
    ): Promise<User | null> {
        const connection = await client.connect();
        const sql =
            'SELECT firstName, lastName, userName, password FROM users WHERE userName=($1)';
        const result = await connection.query(sql, [userName]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                return user;
            }
        }
        return null;
    }

    async index(): Promise<User[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT id, firstName, lastName, userName FROM users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot get users ${err}`);
        }
    }

    async show(id: string): Promise<User | string> {
        try {
            const connection = await client.connect();
            const sql =
                'SELECT id, firstName, lastName, userName FROM users WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            if (result.rowCount === 0) {
                return 'User Not Found';
            }
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot get user ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const connection = await client.connect();
            const sql =
                'INSERT INTO users(firstName, lastName, userName, password)' +
                `VALUES(($1), ($2), ($3), ($4)) RETURNING *`;
            const hash = bcrypt.hashSync(
                u.password + BCRYPT_PASSWORD,
                parseInt(SALT_ROUNDS as string)
            );
            const result = await connection.query(sql, [
                u.firstName,
                u.lastName,
                u.userName,
                hash,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot create USER ${err}`);
        }
    }

    async update(u: User, id: string): Promise<User> {
        try {
            const connection = await client.connect();
            const sql =
                'UPDATE users SET firstName=($1), lastName=($2), userName=($3), password=($4) WHERE id=($5) RETURNING *';
            const hash = bcrypt.hashSync(
                u.password + BCRYPT_PASSWORD,
                parseInt(SALT_ROUNDS as string)
            );
            const result = await connection.query(sql, [
                u.firstName,
                u.lastName,
                u.userName,
                hash,
                id,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot create USER ${err}`);
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const connection = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Cannot Delete USER ${err}`);
        }
    }
}
