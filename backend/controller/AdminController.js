import AdminModel from '../Models/Admin.js';

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AdminModel.findOne({ email });
        if (user && user.password === password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Failed to process login request.' });
    }
};
// export const AdminSignup = async (req, res) => {
//     const { email, password, Username } = req.body;

//     try {
//         const newApplicant = new AdminModel({
//             email: email,
//             password: password,
//             Username: Username
//         });

//         await newApplicant.save();
//         res.status(201).json(newApplicant);
//     } catch (error) {
//         console.log("Error: Application not saved.");
//         res.status(500).json({ message: "Failed to create application." });
//     }
// };