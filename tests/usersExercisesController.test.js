// require the dev-dependencies
import app from '../index.js';
import request from 'supertest';
import { expect } from 'chai';
import { exercise } from '../mock/exercise.js';
import { user } from '../mock/user.js';

// mocha & chai
describe('exercises endpoints', () => {
  it('it should POST logs to a user', async () => {
    const res = await request(app)
      .post(`/api/users/${user._id}/exercises`)
      .send({ ...exercise, _id: user._id });
    expect(res.status).to.equal(200);
    expect(res.body).be.a('object');
  });
});
