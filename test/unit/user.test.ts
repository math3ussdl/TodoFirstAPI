import { agent as request } from 'supertest';
import { expect } from 'chai';
import faker from 'faker';

import app from '../../src/app';


faker.locale = 'pt_BR';

let userID: string;

const USER_REGISTER_MOCK = {
  name: faker.name.findName(),
  phone: '5581985458448',
  email: faker.internet.email()
}

const USER_UPDATE_MOCK = {
  ...USER_REGISTER_MOCK,
  name: 'Bruno Lima'
}

describe('User test suite', function () {
  it('should creates a user passing all data correctly', async function () {
    const res = await request(app)
      .post('/api/users')
      .send(USER_REGISTER_MOCK);

    if (res.body.data) {
      userID = res.body.data._id;
    }

    /* Expects */
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.an('object');
    expect(res.body.errors).to.be.null;
  });

  it('should searches all users', async function () {
    const res = await request(app).get('/api/users');

    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.an('array');
    expect(res.body.errors).to.be.null;
  });

  it('should searches one user by id', async function () {
    const res = await request(app).get(`/api/users/${userID}`);

    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.an('object');
    expect(res.body.errors).to.be.null;
  });

  it('should updates a user by id passing all data correctly', async function () {
    const res = await request(app)
      .put(`/api/users/${userID}`)
      .send(USER_UPDATE_MOCK);

    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.an('object');
    expect(res.body.errors).to.be.null;
  });

  it('should deletes a user by id', async function () {
    const res = await request(app).delete(`/api/users/${userID}`);

    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.a('string');
    expect(res.body.errors).to.be.null;
  });
});
