import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRY } from '../config/serverConfig.js';

export const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  return token;
};
