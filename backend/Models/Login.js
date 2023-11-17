import mongoose from 'mongoose';

const SignupApplicationStructure = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // Add email validation here
    },
    password: {
        type: String,
        required: true
    },
    Username: String,
    address: String,
    city: String,
    state: String,
    zip: String
}, { timestamps: true });

const SignupModel = mongoose.model('Signup', SignupApplicationStructure);

export default SignupModel;
