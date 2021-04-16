import { agent as request } from 'supertest';
import { expect } from 'chai';
import faker from 'faker';

import { app } from '../../src/app';

faker.locale = 'pt_BR';

let statusID: string;

const STATUS_REGISTER_MOCK = {
	description: 'ATRIBUIDA'
};

const STATUS_UPDATE_MOCK = {
	description: 'EM_ANDAMENTO'
};

describe('Status test suite', function () {
	it('should creates a status passing all data correctly', async function () {
		const res = await request(app)
			.post('/api/statuses')
			.send(STATUS_REGISTER_MOCK);

		if (res.body.data) {
			statusID = res.body.data._id;
		}

		/* Expects */
		expect(res.status).to.equal(201);
		expect(res.body).not.to.be.null;
		expect(res.body.data).not.to.be.null;
		expect(res.body.data).to.be.an('object');
		expect(res.body.errors).to.be.null;
	});

	it('should searches all statuses', async function () {
		const res = await request(app).get('/api/statuses');

		/* Expects */
		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.null;
		expect(res.body.data).not.to.be.null;
		expect(res.body.data).to.be.an('array');
		expect(res.body.errors).to.be.null;
	});

	it('should searches one status by id', async function () {
		const res = await request(app).get(`/api/statuses/${statusID}`);

		/* Expects */
		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.null;
		expect(res.body.data).not.to.be.null;
		expect(res.body.data).to.be.an('object');
		expect(res.body.errors).to.be.null;
	});

	it('should updates a status by id passing all data correctly', async function () {
		const res = await request(app)
			.put(`/api/statuses/${statusID}`)
			.send(STATUS_UPDATE_MOCK);

		/* Expects */
		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.null;
		expect(res.body.data).not.to.be.null;
		expect(res.body.data).to.be.an('object');
		expect(res.body.errors).to.be.null;
	});

	it('should deletes a status by id', async function () {
		const res = await request(app).delete(`/api/statuses/${statusID}`);

		/* Expects */
		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.null;
		expect(res.body.data).not.to.be.null;
		expect(res.body.data).to.be.a('string');
		expect(res.body.errors).to.be.null;
	});
});
