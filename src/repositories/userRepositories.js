import User from '../models/userModel.js';
import crudRepositories from './crudRepositories';

const userRepositories = {
  ...crudRepositories(User),

  getUserByEmail: async (email) => {
    const user = await User.findOne({ email });
    return user;
  },

  getUserByName: async (name) => {
    const user = await User.findOne({ username: name });
    return user;
  }
};

export default userRepositories;
