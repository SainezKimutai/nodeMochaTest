process.env.NODE_ENV === 'test'
const chai = require("chai")
const chaiHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const db = require('../db/index.js');
const app = require('../server');


chai.use(chaiHttp);

describe('POST /api/v1/users', () => {

  before((done) => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err))
  })
  after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err))
  })

  it('OK, registering a user works', (done) => {
    chai.request(app).post('/api/v1/users/')
      .send({email: 'kim@kim.com', name:'Kim', password: '123456', userRole: 'admin'})
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

})
