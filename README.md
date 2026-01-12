# News Aggregator API

A RESTful API that allows users to register, log in, manage their news preferences, and fetch news articles tailored to their interests using the [NewsAPI](https://newsapi.org/).

## Features

- **User Authentication:** Sign up and login with secure password hashing (bcrypt) and JWT-based authentication.
- **Preferences Management:** Users can retrieve and update their news preferences (e.g., "bitcoin", "technology", "sports").
- **Personalized News:** Fetches real-time news articles based on the user's saved preferences.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt
- **External API:** NewsAPI (via Axios)
- **Testing:** Tap & Supertest

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB installed and running locally, or a MongoDB Atlas connection string.
- A generic API key from [NewsAPI.org](https://newsapi.org/).

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd news-aggregator-api-guruvikra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   # Server Port
   PORT=3000

   # Database Connection
   MONGO_URI=mongodb://localhost:27018/auth

   # JWT Configuration
   ACCESS_TOKEN_SECRET=your_super_secret_jwt_key
   ACCESS_TOKEN_EXPIRY=1d

   # NewsAPI Key (Get one at https://newsapi.org/)
   NEWS_API_KEY=your_news_api_key_here
   ```

## API Endpoints

### Auth

- **POST** `/users/signup`
  - Body: `{ "name": "John", "email": "john@example.com", "password": "pass", "preferences": ["tech"] }`
  - Register a new user.

- **POST** `/users/login`
  - Body: `{ "email": "john@example.com", "password": "pass" }`
  - Login and receive a JWT token.

### User Preferences (Protected)
*Requires header: `Authorization: Bearer <token>`*

- **GET** `/users/preferences`
  - Retrieve the logged-in user's preferences.

- **PUT** `/users/preferences`
  - Body: `{ "preferences": ["bitcoin", "ai"] }`
  - Append new preferences to the user's list.

### News (Protected)
*Requires header: `Authorization: Bearer <token>`*

- **GET** `/news`
  - Fetch news articles based on the user's preferences.

## Running Tests

This project uses `tap` for testing. Ensure your MongoDB is running before executing tests.

```bash
npm test
```

## Project Structure

```
src/
├── controllers/    # Request handlers
├── middlewares/    # Auth middleware
├── models/         # Mongoose schemas
├── routes/         # API Route definitions
├── app.js          # Express app setup
└── server.js       # Server entry point & DB connection
```
