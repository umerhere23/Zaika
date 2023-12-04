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
        console.error(error); 
        res.status(500).json({ message: "Error fetching user details" });
    }
};
export const updateUserDetails = async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    try {
        const user = await SignupModel.findByIdAndUpdate(userId, updatedUserData, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ message: 'Failed to update user details' });
    }
};