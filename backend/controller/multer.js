import multer from 'multer';

const storage = multer.memoryStorage(); // Use memory storage for handling file uploads
const upload = multer({ storage: storage });

// Apply the middleware to the route where file uploads are expected
router.post('/upload', upload.single('image'), AddRecipe);
