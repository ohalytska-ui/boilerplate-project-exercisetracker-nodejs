// require the dev-dependencies
import app from '../index.js';
import request from 'supertest';
import { expect } from 'chai';
import { user } from '../mock/user.js';

// mocha & chai
describe('users endpoints', () => {
  it('it should GET all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).to.equal(200);
    expect(res.body).be.a('array');
  });

  it('it should POST a new user', async () => {
    const res = await request(app).post('/api/users').send(user);
    expect(res.status).to.equal(200);
    expect(res.body).be.a('object');
  });

  it('it should GET user by the given id', async () => {
    const res = await request(app).get(`/api/user/${user._id}`);
    expect(res.status).to.equal(200);
    expect(res.body).be.a('object');
    expect(res.body).have.property('_id');
    expect(res.body).have.property('_id').equal(user._id);
    expect(res.body).have.property('username');
  });

  it('it should not GET user by the wrong id', async () => {
    const res = await request(app).get(`/api/user/noId`);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('No such user!');
  });

  it('it should not POST a new user (with no unique username)', async () => {
    const res = await request(app).post('/api/users').send({ username: user.username });
    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('Not unique username!');
  });
});
