import Signup from '../Models/Login.js';

export const loginApplication = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Signup.findOne({ email });

        if (user) {
            // Compare the stored password with the provided password (plain text)
            if (user.password === password) {
                // Successful login
                res.status(200).json({ message: 'Login successful' });
            } else {
                // Invalid login
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            // User not found
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error: Login failed.');
        res.status(500).json({ message: 'Failed to process login request.' });
    }
};
