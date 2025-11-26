import express from 'express';
import upload from '../config/cloudinary.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log('File uploaded successfully:', req.file.path);
    res.json({ url: req.file.path });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  console.error('Multer/Upload error:', error);
  res.status(500).json({ 
    message: 'File upload failed', 
    error: error.message 
  });
});

export default router;
