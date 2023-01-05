// require the dev-dependencies
import app from '../index.js';
import request from 'supertest';
import { expect } from 'chai';

// mocha & chai
describe('route', () => {
  it('it should not GET random page', async () => {
    const res = await request(app).get('/randomPage');
    expect(res.status).to.equal(404);
  });

  it('it should GET main page', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
  });
});
