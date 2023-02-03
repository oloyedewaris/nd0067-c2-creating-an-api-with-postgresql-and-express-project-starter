import supertest from 'supertest';
import app from '../server';
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

describe('Test products endpoint with supertest', function () {
  it('should respond with success status to get products', async () => {
    const result = await supertest(app).get('/products');
    expect(result.statusCode).toBe(200);
  });
  it('should show a status code of 400', async () => {
    const result = await supertest(app).get('/products/null');
    expect(result.statusCode).toBe(400);
  });
});

describe('Test user endpoint with supertest', function () {
  it('should show status of 200 after creating user', async () => {
    const result = await supertest(app)
      .post('/users')
      .send({ username: 'test_username', password: 'test_password' });
    expect(result.statusCode).toBe(200);
  });
  it('should show status of 400 after creation failed', async () => {
    const result = await supertest(app)
      .post('/users')
      .send({});
    expect(result.statusCode).toBe(400);
  });
});

describe('Test orders endpoint with supertest', function () {
  it('should show a status of 200 after requesting for orders', async () => {
    const result = await supertest(app).get('/orders')
    expect(result.statusCode).toBe(200);
  });
  // it('rqe', async () => {
  //   const result = await supertest(app).get('/products');
  //   expect(result.statusCode).toBe(200);
  // });
});