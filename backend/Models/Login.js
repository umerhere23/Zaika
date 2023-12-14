import mongoose from 'mongoose';

const SignupApplicationStructure = new mongoose.Schema({
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
  Username: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  isBlocked: {
    type: Boolean,
    default: false, 
  },

}, { timestamps: true });

const SignupModel = mongoose.model('Signup', SignupApplicationStructure);

export default SignupModel;
