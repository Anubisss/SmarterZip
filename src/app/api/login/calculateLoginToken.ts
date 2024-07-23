import crypto from 'crypto';

const calculateLoginToken = (password: string, nonce: string): string => {
  const passwordHash = crypto.createHash('sha1').update(password).digest('hex');
  return crypto
    .createHash('sha1')
    .update(nonce + passwordHash)
    .digest('hex');
};

export default calculateLoginToken;
