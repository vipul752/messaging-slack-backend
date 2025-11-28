import userRepositories from '../repositories/userRepositories.js';

export const signupService = async (userData) => {
  try {
    const newUser = await userRepositories.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
