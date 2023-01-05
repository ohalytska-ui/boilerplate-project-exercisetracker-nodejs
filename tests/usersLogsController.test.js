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
  });

  it('it should not GET user logs', async () => {
    const res = await request(app).get(`/api/users/noId/logs`);
    expect(res.status).to.equal(400);
  });

  it('it should GET user logs with additional params', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs/?from=2021-01-01&to=2022-12-12&limit=1`);
    expect(res.status).to.equal(200);
  });

  it('it should not GET user logs array', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs/?from=2021-01-01&to=2022-12-12&limit=-1`);
    expect(res.status).to.equal(400);
  });

  it('it should not GET user logs array', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs/?from=01-01-2021&to=2022-12-12&limit=-1`);
    expect(res.status).to.equal(400);
  });

  it('it should not GET empty logs array', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs/?from=2022-12-12&to=01-01-2021&limit=-1`);
    expect(res.status).to.equal(400);
  });

  it('it should not GET user logs array', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs/?from=12-12-2022&to=01-01-2021&limit=-1`);
    expect(res.status).to.equal(400);
  });
});
