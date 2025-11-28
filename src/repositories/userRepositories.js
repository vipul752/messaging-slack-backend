import User from '../Schema/User.js';
import crudRepositories from './crudRepositories.js';

let userRepositories = {};

async function initUserRepositories() {
  userRepositories = await crudRepositories(User);

  userRepositories.getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
  };

  userRepositories.getUserByName = async (name) => {
    const user = await User.findOne({ username: name }).select('-password');
    return user;
  };

  return userRepositories;
}

await initUserRepositories();

export default userRepositories;
