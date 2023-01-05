// require the dev-dependencies
import app from '../index.js';
import request from 'supertest';
import { expect } from 'chai';
import { exercise } from '../mock/exercise.js';
import { user } from '../mock/user.js';

// mocha & chai
describe('exercises endpoints', () => {
  it('it should GET user logs array before add exercises/logs to a user', async () => {
    const res = await request(app).get(`/api/users/${user._id}/logs/?from=2021-01-01&to=2022-12-12&limit=1`);
    expect(res.status).to.equal(200);
  });

  it('it should POST logs to a user', async () => {
    const res = await request(app)
      .post(`/api/users/${user._id}/exercises`)
      .send({ ...exercise, _id: user._id });
    expect(res.status).to.equal(200);
  });

  it('it should not POST logs to a user (without description)', async () => {
    const res = await request(app)
      .post(`/api/users/${user._id}/exercises`)
      .send({ duration: exercise.duration, _id: user._id });
    expect(res.status).to.equal(400);
  });

  it('it should not POST logs to a user (without duration)', async () => {
    const res = await request(app)
      .post(`/api/users/${user._id}/exercises`)
      .send({ description: exercise.description, _id: user._id });
    expect(res.status).to.equal(400);
  });

  it('it should not POST logs to a user (without user id)', async () => {
    const res = await request(app).post(`/api/users/noId/exercises`).send(exercise);
    expect(res.status).to.equal(400);
  });
});
