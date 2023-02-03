process.env.ENV = 'test';

import client from '../database';
console.log('Creating Samples for database testing ...');


async function orderSample(): Promise<void> {
  const conn = await client.connect();
  const sql = 'INSERT INTO orders (status, username) VALUES ($1, $2)';
  await conn.query(sql, ['active', 'waris']);
  conn.release();
}

async function productSample(): Promise<void> {
  const conn = await client.connect();
  const sql = 'INSERT INTO products (name, price) VALUES ($1, $2)';
  await conn.query(sql, ['test_product', '9999']);
  conn.release();
}

async function userSample(): Promise<void> {
  const conn = await client.connect();
  const sql = 'INSERT INTO users (username, password_digest) VALUES ($1, $2)';
  await conn.query(sql, ['waris', 'test-password']);
  conn.release();
}

async function makeSamples(): Promise<void> {
  await userSample();
  await orderSample();
  await productSample();
}

makeSamples();
