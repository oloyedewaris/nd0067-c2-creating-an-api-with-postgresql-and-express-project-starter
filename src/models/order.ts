import client from '../database';
import { Item } from '../../types/item';

export type Order = {
  id?: string;
  status?: string;
  username: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error ${err}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order ${id}. Error: ${err}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      order.status = 'active';
      const sql =
        'INSERT INTO orders (status, username) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.status, order.username]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. Error ${err}`);
    }
  }
  async delete(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
  async addProduct(item: Item): Promise<Item> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        item.quantity,
        item.orderId,
        item.productId,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${item.productId} to order ${item.orderId}. Error: ${err}`
      );
    }
  }
  async completeOrder(id: string): Promise<void> {
    try {
      const conn = await client.connect();
      const status = 'complete';
      const sql = 'UPDATE orders SET status=($1) WHERE id=($2)';
      await conn.query(sql, [status, id]);
      conn.release();
    } catch (err) {
      throw new Error(`Could not complete order ${id}. Error ${err}`);
    }
  }
}
