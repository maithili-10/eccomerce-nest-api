import * as crypto from 'crypto';

// Function to generate a secure secret key for JWT
const generateSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex'); // Adjust the size as needed
};


export default{
  EXPIRATION_TIME:60,
    SECRET_KEY:generateSecretKey()
}