CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20),
    username VARCHAR(30) REFERENCES users(username)
);