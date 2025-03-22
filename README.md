# Simple Todo App

A super simple todo list application built with Express.js, MongoDB, and vanilla JavaScript.

## Features

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Persists data to MongoDB database

## Requirements

- Node.js
- MongoDB (running locally or a MongoDB Atlas connection)

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Make sure MongoDB is running (or set the MONGO_URI environment variable to your MongoDB connection string)
4. Start the application:
   ```
   npm start
   ```
5. Open your browser to http://localhost:3000

## Environment Variables

- `PORT` - Port for the server (default: 3000)
- `MONGO_URI` - MongoDB connection string (default: mongodb://127.0.0.1:27017/mydb) 