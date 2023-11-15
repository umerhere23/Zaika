// models/Login.js

import mongoose from 'mongoose';

const SignupApplicationStructure = mongoose.Schema(
    {
        email: String,
        password: String,
        address: String,
        city: String,
        state: String,
        zip: String,
    }
);

const SignupModel = mongoose.model('Signup', SignupApplicationStructure);

export default SignupModel;



