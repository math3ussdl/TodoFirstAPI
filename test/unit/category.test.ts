import { agent as request } from 'supertest';
import { expect } from 'chai';
import faker from 'faker';

import app from '../../src/app';


faker.locale = 'pt_BR';

let categoryID: string;

const CATEGORY_REGISTER_MOCK = {
  description: 'acadêmico'
}

const CATEGORY_UPDATE_MOCK = {
  description: 'musical'
}

describe('Category test suite', function () {
  it('should creates a category passing all data correctly', async function () {
    const res = await request(app)
      .post('/api/categories')
      .send(CATEGORY_REGISTER_MOCK);

    if (res.body.data) {
      categoryID = res.body.data._id;
    }

    /* Expects */
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.an('object');
    expect(res.body.errors).to.be.null;
  });

  it('should searches all categories', async function () {
    const res = await request(app).get('/api/categories');

    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.an('array');
    expect(res.body.errors).to.be.null;
  });

  it('should searches one category by id', async function () {
    const res = await request(app).get(`/api/categories/${categoryID}`);

    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.an('object');
    expect(res.body.errors).to.be.null;
  });

  it('should updates a category by id passing all data correctly', async function () {
    const res = await request(app)
      .put(`/api/categories/${categoryID}`)
      .send(CATEGORY_UPDATE_MOCK);

    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.an('object');
    expect(res.body.errors).to.be.null;
  });

  it('should deletes a category by id', async function () {
    const res = await request(app).delete(`/api/categories/${categoryID}`);

    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.a('string');
    expect(res.body.errors).to.be.null;
  });
});
