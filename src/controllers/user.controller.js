import { signinService, signupService } from '../service/userService.js';

const signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    res.status(201).json({ user, message: 'user created successfully' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'failed to signup', error: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const user = await signinService(req.body);
    res.status(200).json({ user, message: 'user signed in successfully' });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: 'failed to signin', error: error.message });
  }
};

export { signup, signin };
