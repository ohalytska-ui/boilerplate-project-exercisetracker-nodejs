// require the dev-dependencies
import { expect } from 'chai';
import db from '../db/db.js';

// mocha & chai
describe('db', () => {
  it('it to be a valid db', async () => {
    expect(db).to.be.a('object');
  });
});
