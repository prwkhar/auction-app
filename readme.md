# Auction Hub Backend

Auction Hub Backend is the server-side component of the real-time auction hosting platform built using Express.js, MongoDB, and Socket.io. This backend handles user authentication, auction management, and real-time bidding functionalities.

---

## 🚀 API Endpoints

### User Management

- **Register User**  
  **Endpoint:** `POST http://localhost:8000/api/v1/users/register`  
  **Headers:**  
  - `Content-Type: application/json`  
  **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "john_doe",
    "password": "password123"
  }
Login User
Endpoint: POST http://localhost:8000/api/v1/users/login
Headers:

Content-Type: application/json
Request Body:

json
Copy
Edit
{
  "username": "john_doe",
  "password": "password123"
}
Logout User
Endpoint: POST http://localhost:8000/api/v1/users/logout
Headers:

Authorization: Bearer {{accessToken}}

Auction Management
Host Auction
Endpoint: POST http://localhost:8000/api/v1/auctions/host
Headers:

Content-Type: application/json

Authorization: Bearer {{accessToken}}
Request Body:

json
Copy
Edit
{
  "title": "Vintage Car Auction",
  "description": "Auction for a vintage car from 1965.",
  "image": "https://example.com/image.jpg",
  "startingBid": 10000,
  "startTime": "2025-04-01T10:00:00.000Z",
  "endTime": "2025-04-01T12:00:00.000Z"
}
Get All Auctions
Endpoint: GET http://localhost:8000/api/v1/auctions

Get Auction By ID
Endpoint: GET http://localhost:8000/api/v1/auctions/{{auctionId}}

Place Bid
Endpoint: POST http://localhost:8000/api/v1/auctions/bid
Headers:

Content-Type: application/json

Authorization: Bearer {{accessToken}}
Request Body:

json
Copy
Edit
{
  "auctionId": "{{auctionId}}",
  "bidAmount": 12000
}
🔧 Getting Started
Prerequisites
Node.js (v16+ recommended)

Git

MongoDB (if running locally)

Installation
Clone the Repository

sh
Copy
Edit
git clone https://github.com/prwkhar/auction-app-backend.git
cd auction-app-backend
Install Dependencies

sh
Copy
Edit
npm install
Set Up Environment Variables

Create a .env file in the root directory and add:

sh
Copy
Edit
PORT=8000
MONGO_URI=<Your_MongoDB_URI>
JWT_SECRET=<Your_Secret_Key>
Start the Server

sh
Copy
Edit
npm start
The backend server will run on http://localhost:8000/
