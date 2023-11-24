# Dominant Color Extraction Project

This project is designed to extract dominant colors from search input. It consists of two main parts: a backend server built with Node.js and Express, and a frontend interface built with React. The backend server handles input images processing to extract dominant colors, while the frontend provides a user interface for submitting input and displaying results.

# Setup

# Backend

The backend server is built using Node.js and Express. It provides an API endpoint to extract dominant colors from a given input.

Ensure you have Node.js installed on your system.
Navigate to the backend directory:

cd /server
Install dependencies:

npm install/ yarn

Create a .env file in the root of the backend directory and add necessary environment variables.

PORT = 5001 ( if, want to change the PORT then have to update the same in the client end.)
NODE_ENV = 'development'

Running the Server
To start the server, run:

npm run server/ yarn server
The server will start running on http://localhost:5001/.

# Frontend

The frontend is a React application that allows users to enter an input and view the dominant color extracted from the input images( 5 as per current ).

Setup
Ensure you have Node.js and npm installed on your system.

Navigate to the frontend directory:
cd /client

Install dependencies:
npm install/ yarn

Running the Frontend
To start the React application, run:

npm start/ yarn start
The application will be available at http://localhost:3000/.

Usage
Enter the value in the input field.
Click the 'Submit' button.
The dominant color extracted from the image will be displayed on the screen.

# Dataset Relation

The application works by taking a user's search input to fetch relevant images using the Pexels API. The backend then processes these images to extract the dominant colors. Here's how the dataset relation works in this project:

Input: The user enters a search term (e.g., "ocean", "forest", "red car").
Image Fetching: The backend makes a request to the Pexels API with the user's search term to fetch related images.
Color Extraction: The backend uses the Vibrant.js library to analyze each image and extract the most dominant color.
Output: The frontend displays the fetched images dominant colors.
This process showcases the relationship between the user's search input and the resulting colors, demonstrating how the application can interpret and visualize color themes from various subjects.

# Technologies Used

    Backend:
        Node.js
        Express
        Axios
        Vibrant (for color extraction)

    Frontend:
        React
        Axios (for API requests)
