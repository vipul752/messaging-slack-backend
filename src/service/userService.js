import userRepositories from '../repositories/userRepositories.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';

export const signupService = async (userData) => {
  try {
    const newUser = await userRepositories.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signinService = async (userData) => {
  try {
    const user = await userRepositories.getUserByEmail(userData.email);

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = bcrypt.compareSync(userData.password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      token: generateToken({ id: user._id, email: user.email })
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
