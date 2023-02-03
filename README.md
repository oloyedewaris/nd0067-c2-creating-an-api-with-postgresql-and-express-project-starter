# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.
## Installation and Setup guide

1- Clone the repo
2- Change directory to the cloned repo
3- Run ```npm install```
4- You have to create two files to run the server and connect to database:
4.1- Create a ```.env``` file in the project root with the following environment variables
```bash
POSTGRES_TEST_DB=postgres_test
POSTGRES_HOST=127.0.0.1
POSTGRES_USER=${POSTGRES_USERNAME}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DEV_DB=postgres_dev
ENV=dev
BCRYPT_PASSWORD=${BCRYPT_PASSWORD}
SALT_ROUNDS=10
TOKEN_SECRET=${JWT_TOKEN_SECRET}
```
```${POSTGRES_USERNAME}```: A username that will be used in connecting/migrating to the database
```${POSTGRES_PASSWORD```: A password for postgres
```${BCRYPT_PASSWORD}```: A password that is unqiue for the database to hash and encrypt a user's password
```${JWT_TOKEN_SECRET}```: Token secret unique for the routers in the API to verify and authenticate requests
4.2- Createa a ```database.json``` file in the project root with the following variables:
```bash
{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "postgres_dev",
      "user": ${POSTGRES_USER},
      "password": ${POSTGRES_PASSWORD}
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "postgres_test",
      "user": ${POSTGRES_USER},
      "password": ${POSTGRES_PASSWORD}
    }
  }
```

## Running The Database
To connect to the database simply run
```docker compose up```
IP Address: localhost
Port: 5432
## Running The Application/Server
After installation, you can the server using of two commands:
- ```npm run build && node ./dist/server.js```
or
```npm run start```
The server start at ```localhost:3000```

## Endpoints
### Users Endpoints
A getUsers Route: ```/users ``` [GET]
A showUser Route: ```/users/:username ``` [GET]
A createUser Route: ```/users``` [POST] 
A login Route: ```/users/login``` [POST]

### Products Endpoints
A getProducts Route: ```/products``` [GET]
A showProduct Route: ```/products/:id``` [GET]
A createProduct Route: ```/products``` [POST]

### Orders Endpoints

A getOrder Route: ```/orders``` [GET]
A show Route: ```/orders/:id``` [GET]
A createOrder Route: ```/orders``` [POST]
A cancelOrder Route: ```/orders/:id``` [DELETE]
An addProduct Route: ```/orders/:id/products``` [POST]
A completeOrder Route: ```/orders/:id``` [UPDATE]

## Database Tables

### Users Table
Primary Key: username VARCHAR
first_name VARCHAR, optional
last_name VARCHAR, optional
password_digest text

### Products Table
Primary Key: id SERIAL
name VARCHAR
price integer

### Orders Table
Primary Key: id SERIAL
status VARCHAR, optional
username VARCHAR, foreign key to **Users** table

### Orders' Products Table
Primary Key: id SERIAL
quantity integer
order_id bigint. Foreign key to **Orders** table
product_id bigint. Foreign key to **Products** table