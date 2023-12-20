import ShippingData from '../Models/ShippingData.js';

export const saveShippingData = async (req, res) => {
  try {
    const { firstName, lastName, address, email, phone, cardName, cardNumber, expiration, cvv, shippingSameAsBilling, saveInfoForNextTime } = req.body;

    if (!firstName || !lastName || !address || !email || !phone || !cardName || !cardNumber || !expiration || !cvv) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newShipping = new ShippingData({
        firstName,
        lastName,
        address,
        email,
      phone,
      cardName,
      cardNumber,
      expiration,
      cvv,
      shippingSameAsBilling,
      saveInfoForNextTime,
    });

    await newShipping.save();

    res.status(201).json({ message: 'Shipping data saved successfully' });
  } catch (error) {
    console.error('Error saving shipping data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
