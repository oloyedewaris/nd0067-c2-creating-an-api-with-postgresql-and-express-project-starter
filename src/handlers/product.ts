import express from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middlewares/auth';

const productStore = new ProductStore();

const getProducts = async (_req: express.Request, res: express.Response) => {
  try {
    const products = await productStore.index();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json('Error getting products');
  }
};

const showProduct = async (req: express.Request, res: express.Response) => {
  const id = req.body.id;
  if (!id)
    return res.status(400).json('id not found');
  try {
    const product = await productStore.show(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json('Error getting products');
  }
};

const createProduct = async (req: express.Request, res: express.Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
  };

  if (!product.name || !product.price) {
    res.status(400).send('product name or price not found in request body');
  }
  try {
    const newProduct = await productStore.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json('error creating product');
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', getProducts);
  app.get('/products/:id', showProduct);
  app.post('/products', verifyAuthToken, createProduct);
};

export default productRoutes;
