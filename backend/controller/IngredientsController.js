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



    
    export const removeIng = async (req, res) => {
      const { _id } = req.params;
    
      try {
        const IngredientFeedback = await IngredientPack.findByIdAndDelete(_id);
    
        if (!IngredientFeedback) {
          return res.status(404).json({ message: 'Ingredient not found' });
        }
    
        res.json({ message: 'Ingredient deleted successfully' });
      } catch (error) {
        console.error('Error deleting Ingredient:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    };

    export const updateIngredientQuantity = async (req, res) => {
      const { id } = req.params;
      const { updatedQuantity } = req.body;
    
      try {
        const ingredient = await IngredientPack.findById(id);
    
        if (!ingredient) {
          return res.status(404).json({ error: 'Ingredient not found' });
        }
    
        ingredient.totalProducts = updatedQuantity;
    
        await ingredient.save();
    
        res.status(200).json({ message: 'Ingredient quantity updated successfully' });
      } catch (error) {
        console.error('Error updating ingredient quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };