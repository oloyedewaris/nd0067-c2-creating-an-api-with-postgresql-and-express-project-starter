import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as unknown as string;

export type User = {
  id?: string;
  firstname?: string;
  lastname?: string;
  username: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not retrieve users. Error: ${err}`);
    }
  }
  async show(username: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE username=($1)';
      const result = await conn.query(sql, [username]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user:${username}. Error: ${err}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [user.username, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create user: ${user.username}. Error: ${err}`);
    }
  }
  async login(user: User): Promise<User | null> {
    const conn = await client.connect();
    const sql = 'SELECT * FROM users WHERE username=($1)';
    const result = await conn.query(sql, [user.username]);
    if (result.rows.length) {
      const userHashed: User = {
        username: result.rows[0].username,
        password: result.rows[0].password_digest,
      };
      if (bcrypt.compareSync(user.password + pepper, userHashed.password)) {
        return userHashed;
      }
    }

    return null;
  }
}
