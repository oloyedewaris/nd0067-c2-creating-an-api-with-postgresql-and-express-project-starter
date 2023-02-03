CREATE TABLE users (
    username VARCHAR(30) NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    password_digest text,
    PRIMARY KEY (username)
);