import mongoose from 'mongoose';

const SignupAdminSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const SignupAdminModel = mongoose.model('SignupAdmin', SignupAdminSchema);

export default SignupAdminModel;
