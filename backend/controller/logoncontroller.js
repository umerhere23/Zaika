import Signup from "../Models/Login.js";
import bcrypt from 'bcrypt';

export const getApplications = async (req, res) => {
  try {
      const query = { "email": "444" };
      const SignupApplications = await Signup.find(query);
      res.status(200).json(SignupApplications);
  } catch (error) {
      console.log("Error in GET.");
      res.status(404).json({ message: error.message });
  }
};

export const createApplication = async (req, res) => {
  const { email, password, Username, address, city, state, zip } = req.body;

  try {
      const hashedPassword = await bcrypt.hash(password, 12); // Hash the password

      const newApplicant = new Signup({
          email: email,
          password: hashedPassword, // Store the hashed password
          Username: Username,
          address: address,
          city: city,
          state: state,
          zip: zip
      });

      await newApplicant.save();
      res.status(201).json(newApplicant);
  } catch (error) {
      console.log("Error: Application not saved.");
      res.status(500).json({ message: "Failed to create application." });
  }
};

export const loginApplication1 = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      // Successful login
      res.status(200).json({ message: "Login successful" });
    } else {
      // Invalid login
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error: Login failed.");
    res.status(500).json({ message: "Failed to process login request." });
  }
};