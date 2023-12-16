import bcrypt from 'bcrypt';
import Signup from '../Models/Login.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Signup.findOne({ email });

        if (user) {
            console.log('User found:', user);

            const isPasswordValid = await bcrypt.compare(password, user.password);
         if (isPasswordValid) {
                res.status(200).json({ message: 'Login successful', user: { ...user.toObject() } });
            } else {
                console.log('Invalid email or password');
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            console.log('User not found');
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Failed to process login request.' });
    }
};
