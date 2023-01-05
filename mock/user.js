import crypto from 'crypto';

export const user = {
  _id: crypto.randomBytes(4).toString('hex'),
  username: crypto.randomBytes(4).toString('hex'),
};
