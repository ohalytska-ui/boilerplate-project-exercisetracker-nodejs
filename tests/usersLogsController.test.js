// require the dev-dependencies
import app from '../index.js';
import request from 'supertest';
import { expect } from 'chai';
import { user } from '../mock/user.js';

// mocha & chai
describe('logs endpoints', () => {
  it('it should GET user logs', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs`);
    expect(res.status).to.equal(200);
    expect(res.body).be.a('object');
    expect(res.body).have.property('_id');
    expect(res.body).have.property('_id').equal(user._id);
    expect(res.body).have.property('log').be.a('array');
  });

  it('it should not GET user logs', async () => {
    const res = await request(app).get(`/api/users/noId/logs`);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('No such user!');
  });

  it('it should GET user logs with additional params', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs/?from=2021-01-01&to=2022-12-12&limit=1`);
    expect(res.status).to.equal(200);
    expect(res.body).be.a('object');
    expect(res.body).have.property('_id');
    expect(res.body).have.property('_id').equal(user._id);
    expect(res.body).have.property('log').be.a('array');
  });

  it('it should not GET user logs array', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs/?from=2021-01-01&to=2022-12-12&limit=-1`);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('Wrong limit!');
  });

  it('it should not GET user logs array', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs/?from=01-01-2021&to=2022-12-12&limit=-1`);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal("Wrong 'from' date format! Valid data format is 'yyyy-mm-dd'");
  });

  it('it should not GET empty logs array', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs/?from=2022-12-12&to=01-01-2021&limit=-1`);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal("Wrong 'to' date format! Valid data format is 'yyyy-mm-dd'");
  });

  it('it should not GET user logs array', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs/?from=12-12-2022&to=01-01-2021&limit=-1`);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal("Wrong 'from' and 'to' date format! Valid data format is 'yyyy-mm-dd'");
  });
});
