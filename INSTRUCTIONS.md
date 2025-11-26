# Portfolio Project Instructions

## Setup
This project is a MERN stack application.

### Prerequisites
- Node.js installed
- MongoDB installed and running (or a cloud MongoDB URI)

### Installation
1.  **Server**:
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in `server/` with:
    ```
    MONGO_URI=mongodb://localhost:27017/portfolio_Sanket
    PORT=5000
    JWT_SECRET=your_secret_key
    ```

2.  **Client**:
    ```bash
    cd client
    npm install
    ```

### Running the App
1.  Start the Backend:
    ```bash
    cd server
    npm start
    ```
    (Runs on http://localhost:5000)

2.  Start the Frontend:
    ```bash
    cd client
    npm run dev
    ```
    (Runs on http://localhost:5173)

## Features Added
- **Modern Hero Section**: Animated background shapes and 3D-style profile card.
- **AI Chat Widget**: Floating chat bot that answers basic questions about the portfolio.
- **Admin Panel**: `/admin` route for managing content (Login/Dashboard).
- **Home Page**: Assembled all sections (Hero, About, Projects, Contact).
