import { Order, OrderStore } from '../models/order';
import { Item } from '../../types/item';
import client from '../database';

const order: Order = {
  username: 'waris',
};
const item: Item = {
  quantity: 1,
  orderId: '2',
  productId: '1',
};

const orderStore = new OrderStore();

describe('Order Functions', () => {
  it('should have an index method', () => {
    expect(orderStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(orderStore.delete).toBeDefined();
  });
  it('should have an addProduct method', () => {
    expect(orderStore.addProduct).toBeDefined();
  });
  it('should have a completeOrder method', () => {
    expect(orderStore.completeOrder).toBeDefined();
  });
});

describe('Order Model', () => {
  it('should return a result with length equal 1', async () => {
    const result = await orderStore.index();
    expect(result.length).toBe(1);
  });
  it('should return result has a username=waris', async () => {
    const result = await orderStore.show('1');
    expect(result.username).toBe('waris');
  });
  it('should return result with length=2 after creating a new item', async () => {
    await orderStore.create(order);
    const result = await orderStore.index();
    expect(result.length).toBe(2);
  });
  it('should return result with length=1 after deleting an item', async () => {
    await orderStore.delete('1');
    const result = await orderStore.index();
    expect(result.length).toBe(1);
  });
  it('should succeed and return a result', async () => {
    const result = await orderStore.addProduct(item);
    expect(result).toBeDefined();
  });
  it('should complete order and update its status from active to complete', async () => {
    await orderStore.completeOrder('2');
    const conn = await client.connect();
    const sql = 'SELECT * FROM orders WHERE id=($1)';
    const result = await conn.query(sql, ['2']);
    expect(result.rows[0].status).toBe('complete');
  });
});
