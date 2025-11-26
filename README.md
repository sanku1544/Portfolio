<<<<<<< HEAD
# Krishna Patil - Portfolio Website

A modern, full-stack portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a powerful admin dashboard for content management.

## ✨ Features

- **Dynamic Content Management**: Full-featured admin dashboard to manage all portfolio content
- **Responsive Design**: Beautiful, mobile-first design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Analytics**: Track portfolio views and visitor engagement
- **Image Upload**: Drag-and-drop image uploads with Cloudinary integration
- **Contact Form**: Functional contact form with email notifications
- **SEO Optimized**: Meta tags and Open Graph support for better search visibility
- **Custom Cursor**: Premium interactive cursor effect
- **Toast Notifications**: Beautiful feedback for user actions
- **GitHub Integration**: Display real-time GitHub repository count

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- React Router DOM
- Axios
- React Hot Toast
- React Dropzone
- React Helmet Async (SEO)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt.js
- Cloudinary (image storage)
- Multer (file uploads)
- CORS

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Clone the Repository
```bash
git clone https://github.com/sanku1544/portfolio-krishna.git
cd portfolio-krishna
```

### Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Admin Access

Default admin credentials (change these after first login):
- **Username**: admin
- **Password**: admin123

Access the admin dashboard at: `http://localhost:5173/admin`

## 📝 Admin Dashboard Features

- **Overview**: Real-time statistics (views, projects, messages)
- **General Info**: Update profile information, social links, resume
- **Projects**: Add, edit, delete portfolio projects
- **Experience**: Manage work experience entries
- **Skills**: Add skills with proficiency levels and categories
- **Messages**: View and manage contact form submissions

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set the root directory to `client`
5. Add environment variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g., `https://your-api.onrender.com/api`)
6. Deploy

### Backend (Render)

1. Go to [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the root directory to `server`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT` (Render will provide this)
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
8. Deploy

### Database (MongoDB Atlas)

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP (or use 0.0.0.0/0 for all IPs)
4. Get your connection string and add it to your backend `.env`

## 📱 Features Breakdown

### Public Pages
- **Home**: Hero section with animated profile, GitHub stats, project count
- **About**: Personal information, tech stack, downloadable resume
- **Projects**: Grid of portfolio projects with live demos and GitHub links
- **Skills**: Categorized skills with proficiency bars
- **Experience**: Timeline of work experience
- **Contact**: Functional contact form
- **Footer**: Social links and copyright

### Admin Features
- Secure JWT authentication
- Image upload with drag-and-drop
- Real-time content updates
- Message management
- Analytics dashboard

## 🎨 Customization

1. Update colors in `tailwind.config.js`
2. Modify animations in component files
3. Change SEO metadata in `src/components/SEO.jsx`
4. Update social links and personal info via admin dashboard

## 🐛 Troubleshooting

**Backend not connecting:**
- Check if MongoDB is running
- Verify `.env` variables are correct
- Ensure port 5000 is not in use

**Frontend API errors:**
- Verify `VITE_API_URL` in `.env`
- Check if backend server is running
- Look for CORS errors in browser console

**Image upload failing:**
- Verify Cloudinary credentials
- Check file size limits
- Ensure `multer-storage-cloudinary` is installed

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Krishna Patil**
- GitHub: [@sanku1544](https://github.com/sanku1544)
- Portfolio: [Your deployed URL]

## 🌟 Show your support

Give a ⭐️ if you like this project!


<!-- admin  password123 -->
=======
# Portfolio
Details about me.
>>>>>>> 669964c9e7c0a4046a7b0fb93b18e66eabe86f5d
