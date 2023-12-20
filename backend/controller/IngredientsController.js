import IngredientPack from '../Models/Ecommerce.js';

export const addIngredientPack = async (req, res) => {
  try {
    const { recipeId, recipeName, totalProducts, details, packName, discount, ingredients, seller, image } = req.body;

    const totalPrice = ingredients.reduce((total, ingredient) => {
      return total + ingredient.price * ingredient.quantity;
    }, 0);

    const newIngredientPack = new IngredientPack({
      recipeId,
      recipeName,
      totalProducts,
      details,
      packName,
      discount,
      ingredients,
      totalPrice,
      seller,
      image,
      
    });

    await newIngredientPack.save();

    res.status(201).json({
      success: true,
      message: 'IngredientPack added successfully',
      data: newIngredientPack,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export const AllIngredients = async (req, res) => {
  try {
    const allIngredients = await IngredientPack.find();

    res.status(200).json(allIngredients);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch allIngredients." });}}


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
    