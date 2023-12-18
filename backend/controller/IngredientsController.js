import IngredientPack from '../Models/Ecommerce.js';

export const addIngredientPack = async (req, res) => {
  try {
    const { recipeId, ingredients, seller, image } = req.body; 

    const totalPrice = ingredients.reduce((total, ingredient) => {
      return total + ingredient.price * ingredient.quantity;
    }, 0);

    const newIngredientPack = new IngredientPack({
      recipeid: recipeId,
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
