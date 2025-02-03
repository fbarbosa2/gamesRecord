import createUser from "../services/firebaseAuth.js";

const registerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    const user = await createUser(email, password, confirmPassword);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message });
  }
};

export default registerUser;