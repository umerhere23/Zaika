// controller/UserController.js
import SignupModel from '../Models/Login.js';

export const getUserDetails = async (req, res) => {
    const { email } = req.query;

    // You might want to add validation for 'email' here

    try {
        const user = await SignupModel.findOne({ email: email });

        if (user) {
            // Consider removing or redacting sensitive data from the user object
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error); // Optional: detailed logging for debugging
        res.status(500).json({ message: "Error fetching user details" });
    }
};
