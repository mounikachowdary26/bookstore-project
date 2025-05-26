# Bookstore MERN Project

A full-stack bookstore application built with Flask (Backend) and React (Frontend).

## Features

- User authentication (Register/Login)
- Book browsing and filtering by category
- Shopping cart functionality
- Order placement
- User profile management

## Tech Stack

- **Frontend:**
  - React
  - React Router
  - Context API for state management
  - Axios for API calls
  - CSS for styling

- **Backend:**
  - Flask
  - SQLAlchemy
  - JWT Authentication
  - SQLite Database

## Project Structure

```
bookstore-mearn-project/
├── backend/               # Flask backend
│   ├── src/
│   │   ├── app.py        # Main application file
│   │   ├── models/       # Database models
│   │   └── routes/       # API routes
│   ├── requirements.txt  # Python dependencies
│   └── venv/            # Python virtual environment
│
└── frontend/            # React frontend
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/       # Page components
    │   ├── context/     # Context providers
    │   └── services/    # API services
    ├── package.json     # Node dependencies
    └── vite.config.js   # Vite configuration
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```bash
   python src/app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/users/register` - Register new user
- POST `/api/users/login` - Login user
- GET `/api/users/me` - Get user profile (Protected)

### Books
- GET `/api/books` - Get all books
- GET `/api/books?category=fiction` - Get books by category
- GET `/api/books/:id` - Get single book

### Orders
- POST `/api/orders` - Create new order (Protected)

## Environment Variables

Create a `.env` file in both frontend and backend directories:

### Backend (.env)
```
JWT_SECRET_KEY=your_jwt_secret
FLASK_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 