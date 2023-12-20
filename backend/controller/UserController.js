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

export const fetchUserData = async (req, res) => {
    try {
      const allUsers = await SignupModel.find();
  
      res.status(200).json(allUsers);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to fetch Users." });}}

      

      export const removeUser = async (req, res) => {
        const { _id } = req.params;
    
        try {
            const deletedUser = await SignupModel.findByIdAndDelete(_id);
    
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    };

// export const blockUser = async (req, res) => {
//     const { id } = req.params;
//     const { action } = req.body;

//     try {
//         const user = await SignupModel.findByIdAndUpdate(id, { isBlocked: action === 'Block' }, { new: true });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error updating user status:', error);
//         res.status(500).json({ message: 'Failed to update user status' });
//     }
// };

    


export const blockUser = async (req, res) => {
    const { _id } = req.params;
    const { isBlocked } = req.body;
  
    try {
      const user = await SignupModel.findByIdAndUpdate(_id, { isBlocked }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user details:', error);
      res.status(500).json({ message: 'Failed to update user details' });
    }
  };
  