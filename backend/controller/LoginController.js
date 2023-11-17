import bcrypt from 'bcrypt';
import Signup from '../Models/Login.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Signup.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            // Successful login
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Invalid login
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Failed to process login request.' });
    }
};
