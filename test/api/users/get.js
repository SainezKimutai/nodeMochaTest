process.env.NODE_ENV = 'test'
const chai = require("chai")
const request = require('supertest');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const db = require('../../../db/test.js');
const app = require('../../../server');

describe('GET /api/v1/users', async () => {

  await before(async () => await db.connect());

  await afterEach(async () => await db.clear());

  await after(async () => await db.close());

  await it('OK, get all users', (done) => {
    request(app).get('/api/v1/users/')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => { done(err)})
  })

  await it('OK, getting users has 1 user', (done) => {
    request(app).post('/api/v1/users/')
      .send({email: 'amon@amon.com', name:'Amon', password: '123456', userRole: 'manager'})
      .then((res) => {
        request(app).get('/api/v1/users/')
          .then((res) => {
            const body = res.body;
            expect(body.length).to.equal(1);
            done();
          })
      })
      .catch((err) => done(err));
  });

})
