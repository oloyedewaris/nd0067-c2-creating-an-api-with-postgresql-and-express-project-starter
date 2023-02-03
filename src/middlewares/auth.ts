import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretToken = process.env.TOKEN_SECRET as unknown as string;

const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, secretToken);
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export default auth;
