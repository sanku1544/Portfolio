# Deployment Guide

## Backend (Render/Railway)
1. Push code to GitHub.
2. Create a new Web Service on Render/Railway.
3. Connect your repository.
4. Set Root Directory to `server`.
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A strong secret.
   - `PORT`: 5000 (or default)

## Frontend (Vercel/Netlify)
1. Create a new project on Vercel/Netlify.
2. Connect your repository.
3. Set Root Directory to `client`.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variables:
   - `VITE_API_URL`: The URL of your deployed backend (e.g., https://portfolio-api.onrender.com)
   - You will need to update `client/src/context/AuthContext.jsx` and other API calls to use this variable instead of `localhost:5000`.
