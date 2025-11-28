import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig.js';
import userRepositories from '../repositories/userRepositories.js';

export const userMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const response = jwt.verify(token, JWT_SECRET);

    if (!response) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await userRepositories.getById(response.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user.id;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};
