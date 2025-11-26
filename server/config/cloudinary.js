import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine resource type based on file mimetype
    const isPdf = file.mimetype === 'application/pdf';
    
    return {
      folder: 'portfolio_krishna',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'pdf'],
      resource_type: isPdf ? 'raw' : 'auto', // Use 'raw' for PDFs, 'auto' for images
    };
  },
});

const upload = multer({ storage });

export default upload;
