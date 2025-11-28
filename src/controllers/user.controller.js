import { signupService } from '../service/userService.js';

const signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    res.status(201).json({ user, message: 'user created successfully' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

export { signup };
