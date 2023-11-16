// controller/UserController.js
import SignupModel from '../Models/Login.js';

export const getUserDetails = async (req, res) => {
    const { email } = req.query;

    try {
        const user = await SignupModel.findOne({ email: email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details" });
    }
};
