
const chai = require("chai")
const request = require('supertest');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const db = require('../../../db/test.js');
const app = require('../../../server');
process.env.NODE_ENV = 'test'

describe('POST /api/v1/users', async () => {


  await before(async () => await db.connect());

  await afterEach(async () => await db.clear());

  await after(async () => await db.close());

  await it('OK, registering a user works', (done) => {
    request(app).post('/api/v1/users/')
      .send({email: 'amon@amon.com', name:'Amon', password: '123456', userRole: 'manager'})
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('email');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('userRole');
        done();
      })
      .catch((err) => { done(err)})
  })


  await it('Fail, user must an email, password and a name', (done) => {
    request(app).post('/api/v1/users/')
      .send({email: 'sainez@sainez.com', userRole: 'manager'})
      .then((res) => {
        const body = res.body;
        expect(res.status).to.equal(500);
        done();
      })
      .catch((err) => { done(err)})
  })

})
