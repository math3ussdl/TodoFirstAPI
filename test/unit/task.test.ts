import { agent as request } from 'supertest';
import { expect } from 'chai';
import faker from 'faker';

import app from '../../src/app';


faker.locale = 'pt_BR';

let taskId: string;

let listId: string;
let authorId: string;
let responsibleId: string;
let categoryId: string;

const AUTHOR_REGISTER_MOCK = {
  name: faker.name.findName(),
	phone: '5581985458448',
	email: faker.internet.email()
};

const RESPONSIBLE_REGISTER_MOCK = {
  name: faker.name.findName(),
	phone: '5581985458550',
	email: faker.internet.email()
};

const CATEGORY_REGISTER_MOCK = {
	description: 'acadêmico'
};

const LIST_REGISTER_MOCK = {
	title: faker.lorem.word(),
	description: faker.lorem.sentence()
};

const TASK_REGISTER_MOCK = {
  description: faker.lorem.sentence(),
  dt_prev: '15-06-2021',
  dt_exec: '14-06-2021'
};

const TASK_UPDATE_MOCK = {
  description: faker.lorem.sentence(),
  dt_prev: '18-08-2020',
  dt_exec: '18-08-2020'
};

describe('Task test suite', function () {
  this.beforeAll(async function () {
    const authorRes = await request(app)
			.post('/api/users')
			.send(AUTHOR_REGISTER_MOCK);

    const responsibleRes = await request(app)
			.post('/api/users')
			.send(RESPONSIBLE_REGISTER_MOCK);

		const categoryRes = await request(app)
			.post('/api/categories')
			.send(CATEGORY_REGISTER_MOCK);

		authorId = authorRes.body.data._id;
    responsibleId = responsibleRes.body.data._id;
		categoryId = categoryRes.body.data._id;

    const listRes = await request(app)
			.post('/api/lists')
			.send({
				...LIST_REGISTER_MOCK,
				authorId,
				categoryId
			});
    
      listId = listRes.body.data._id;
  });

  it('should creates a task passing all data correctly', async function () {
    const res = await request(app)
			.post('/api/tasks')
			.send({
				...TASK_REGISTER_MOCK,
				listId,
				responsibleId
			});
    
    if (res.body.data) {
      taskId = res.body.data._id;
    }

    /* Expects */
		expect(res.status).to.equal(201);
		expect(res.body).not.to.be.null;
		expect(res.body.data).not.to.be.null;
		expect(res.body.data).to.be.an('object');
		expect(res.body.errors).to.be.null;
  });

  it('should searches all tasks', async function () {
    const res = await request(app).get('/api/tasks');

    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.an('array');
    expect(res.body.errors).to.be.null;
  });

  it('should searches one task by id', async function () {
    const res = await request(app).get(`/api/tasks/${taskId}`);

    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.an('object');
    expect(res.body.errors).to.be.null;
  });

  it('should updates a task by id passing all data correctly', async function () {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
				...TASK_UPDATE_MOCK,
				listId,
				responsibleId
			});
    
    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.an('object');
    expect(res.body.errors).to.be.null;
  });

  it('should deletes a task by id', async function () {
    const res = await request(app).delete(`/api/tasks/${taskId}`);

    /* Expects */
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.null;
    expect(res.body.data).not.to.be.null;
    expect(res.body.data).to.be.a('string');
    expect(res.body.errors).to.be.null;
  });

  this.afterAll(async function () {
    await request(app).delete(`/api/lists/${listId}`);
    await request(app).delete(`/api/users/${authorId}`);
    await request(app).delete(`/api/users/${responsibleId}`);
    await request(app).delete(`/api/categories/${categoryId}`);
  });
});
