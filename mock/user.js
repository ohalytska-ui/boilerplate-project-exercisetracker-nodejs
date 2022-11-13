import crypto from 'crypto';

export const user = {
  _id: crypto.randomBytes(20).toString('hex'),
  username: crypto.randomBytes(20).toString('hex'),
};
