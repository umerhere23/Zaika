import multer from 'multer';
import Recipe from '../Models/Recpies.js'; // Adjust the import path based on your folder structure
import path from 'path';

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '../uploads/');
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = path.extname(file.originalname); // Retain the original file extension
    const newFilename = `${uniqueSuffix}${fileExtension}`;
    cb(null, newFilename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept images of any type
  } else {
    cb(new Error('File type not supported'), false); // Reject non-image files
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export const uploadImage = upload.single('image');

export const handleImageUpload = async (req, res) => {
    try {
      const image = req.file;
      const recipeId = req.body.recipeId;
  
      if (!image) {
        return res.status(400).json({ message: 'No image uploaded' });
      }
  
      const imagePath = `uploads/${image.filename}`;
  
      // Update the Recipe model to store imagePath as a string
      const recipe = new Recipe({
        recipeId,
        imagePath, // Store imagePath as a string
      });
      await recipe.save();
  
      res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };