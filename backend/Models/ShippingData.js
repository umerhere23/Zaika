// models/ShippingData.js
import mongoose from 'mongoose';

const shippingInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cardName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expiration: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  shippingSameAsBilling: {
    type: String,
  },
  saveInfoForNextTime: {
    type: String,
  },
});

const ShippingData = mongoose.model('ShippingData', shippingInfoSchema);

export default ShippingData;
