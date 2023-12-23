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

export const MarkComplete = async (req, res) => {
  const { _id } = req.params;
  const { Completed } = req.body;

  try {
    const user = await ShippingData.findByIdAndUpdate(_id, { Completed }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Failed to update user details' });
  }
};
export const DeleteOrder = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedOrder = await ShippingData.findByIdAndDelete(_id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting Order:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
export const fetchShippingData = async (req, res) => {
  try {
    const allUsers = await ShippingData.find();

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch Orders." });}}