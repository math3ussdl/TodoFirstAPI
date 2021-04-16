import { agent as request } from 'supertest';
import { expect } from 'chai';
import faker from 'faker';

import { app } from '../../src/app';

faker.locale = 'pt_BR';

let listId: string;
let authorId: string;
let categoryId: string;

const USER_REGISTER_MOCK = {
	name: faker.name.findName(),
	phone: '5581985458448',
	email: faker.internet.email()
};

const CATEGORY_REGISTER_MOCK = {
	description: 'acadêmico'
};

const LIST_REGISTER_MOCK = {
	title: faker.lorem.word(),
	description: faker.lorem.sentence()
};

const LIST_UPDATE_MOCK = {
	title: faker.lorem.word(),
	description: faker.lorem.sentence()
};

describe('List test suite', function () {
	this.beforeAll(async function () {
		const authorRes = await request(app)
			.post('/api/users')
			.send(USER_REGISTER_MOCK);

		const categoryRes = await request(app)
			.post('/api/categories')
			.send(CATEGORY_REGISTER_MOCK);

		authorId = authorRes.body.data._id;
		categoryId = categoryRes.body.data._id;
	});

	it('should creates a list passing all data correctly', async function () {
		const res = await request(app)
			.post('/api/lists')
			.send({
				...LIST_REGISTER_MOCK,
				authorId,
				categoryId
			});

		if (res.body.data) {
			listId = res.body.data._id;
		}

		/* Expects */
		expect(res.status).to.equal(201);
		expect(res.body).not.to.be.null;
		expect(res.body.data).not.to.be.null;
		expect(res.body.data).to.be.an('object');
		expect(res.body.errors).to.be.null;
	});

	it('should searches all lists', async function () {
		const res = await request(app).get('/api/lists');

		/* Expects */
		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.null;
		expect(res.body.data).not.to.be.null;
		expect(res.body.data).to.be.an('array');
		expect(res.body.errors).to.be.null;
	});

	it('should searches one list by id', async function () {
		const res = await request(app).get(`/api/lists/${listId}`);

		/* Expects */
		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.null;
		expect(res.body.data).not.to.be.null;
		expect(res.body.data).to.be.an('object');
		expect(res.body.errors).to.be.null;
	});

	it('should updates a list by id passing all data correctly', async function () {
		const res = await request(app)
			.put(`/api/lists/${listId}`)
			.send({
				...LIST_UPDATE_MOCK,
				authorId,
				categoryId
			});

		/* Expects */
		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.null;
		expect(res.body.data).not.to.be.null;
		expect(res.body.data).to.be.an('object');
		expect(res.body.errors).to.be.null;
	});

	it('should deletes a list by id', async function () {
		const res = await request(app).delete(`/api/lists/${listId}`);

		/* Expects */
		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.null;
		expect(res.body.data).not.to.be.null;
		expect(res.body.data).to.be.a('string');
		expect(res.body.errors).to.be.null;
	});

	this.afterAll(async function () {
		await request(app).delete(`/api/users/${authorId}`);
		await request(app).delete(`/api/categories/${categoryId}`);
	});
});
