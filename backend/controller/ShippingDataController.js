import ShippingData from '../Models/ShippingData.js';

export const saveShippingData = async (req, res) => {
  try {
    const { firstName, lastName, address, email, phone, cardName, cardNumber, expiration, cvv, seller ,TotalPrice,shippingSameAsBilling, saveInfoForNextTime,Product,ProducdID} = req.body;

    if (!firstName || !lastName || !address || !email || !phone || !cardName || !cardNumber || !expiration || !cvv  ||!Product  || !ProducdID
      ) {
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
      seller,
      TotalPrice,
      shippingSameAsBilling,
      saveInfoForNextTime,
      Product,
      ProducdID

   
    });

    await newShipping.save();

    res.status(201).json({ message: 'Shipping data saved successfully' });
  } catch (error) {
    console.error('Error saving shipping data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getShippingData = async (req, res) => {
  try {
    const { Uname } = req.params;
    const shippingData = await ShippingData.find({ seller: Uname });
    res.json(shippingData);
  } catch (error) {
    console.error('Error fetching shipping data:', error);
    res
      .status(500)
      .json({ error: 'Failed to fetch shipping data. Please try again later.' });
  }
};