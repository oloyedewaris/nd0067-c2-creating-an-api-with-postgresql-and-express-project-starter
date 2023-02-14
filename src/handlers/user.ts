import express from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middlewares/auth';
import dotenv from 'dotenv';
dotenv.config();

const secretToken = process.env.TOKEN_SECRET as unknown as string;

const store = new UserStore();

const getUsers = async (_req: express.Request, res: express.Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const showUser = async (req: express.Request, res: express.Response) => {
  const username = req.body.username;
  if (!username)
    return res.status(400).json('username required');;
  try {
    const user = await store.show(username);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json('error occured while fetching user');
  }
};

const createUser = async (req: express.Request, res: express.Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!user.username || !user.password)
    return res.status(400).json('username and password required');;

  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, secretToken);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json('error occured while getting users');
  }
};

const login = async (req: express.Request, res: express.Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  if (!user.username || !user.password)
    return res.status(400).json('username and password required');;
  try {
    const userData = await store.login(user);
    var token = jwt.sign({ user: userData }, secretToken);
    res.json(token);
  } catch (err) {
    res.status(400).json({ err });
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, getUsers);
  app.get('/users/:username', verifyAuthToken, showUser);
  app.post('/users', createUser);
  app.post('/users/login', login);
};

export default userRoutes;
