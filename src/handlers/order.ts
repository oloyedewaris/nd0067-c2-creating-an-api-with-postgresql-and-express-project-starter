import express from 'express';
import { Order, OrderStore } from '../models/order';
import { Item } from '../../types/item';
import auth from '../middlewares/auth';

const store = new OrderStore();

const getOrders = async (_req: express.Request, res: express.Response) => {
  try {
    const orders = await store.index();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json('an error occurred while creating order');
  }
};

const show = async (req: express.Request, res: express.Response) => {
  const id = req.body.id;
  if (!id)
    return res.status(400).send('id not found');;
  try {
    const order = await store.show(id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json('error occurred while getting order');;
  }
};

const createOrder = async (req: express.Request, res: express.Response) => {
  const order: Order = {
    username: req.body.username,
  };
  try {
    const newOrder = await store.create(order);
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(400).json(err);;
  }
};

const cancelOrder = async (req: express.Request, res: express.Response) => {
  const id = req.body.id;
  if (id == undefined)
    return res.status(400).send('id not found');;
  try {
    const deletedOrder = await store.delete(id);
    res.status(200).json(deletedOrder);
  } catch (err) {
    res.status(400).json(err);;
  }
};

const addProduct = async (req: express.Request, res: express.Response) => {
  const item: Item = {
    quantity: req.body.quantity,
    orderId: req.body.orderId,
    productId: req.body.productId,
  };
  try {
    const addedProduct = await store.addProduct(item);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completeOrder = async (req: express.Request, res: express.Response) => {
  const id = req.body.id;
  if (id == undefined) {
    res.status(400);
    res.send('id not found');
  }
  try {
    const completedOrder = await store.completeOrder(id);
    res.status(200).json(completedOrder);
  } catch (err) {
    res.status(400).json(err);;
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', getOrders);
  app.get('/orders/:id', auth, show);
  app.post('/orders', auth, createOrder);
  app.delete('/orders/:id', auth, cancelOrder);
  app.post('/orders/:id/products', auth, addProduct);
  app.put('/orders/:id', auth, completeOrder);
};

export default orderRoutes;
