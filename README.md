# 🏡 StayFinder

**StayFinder** is a full-stack web application inspired by Airbnb. It allows users to browse, list, and book properties for short-term or long-term stays. Built using the MERN stack (MongoDB, Express, React, Node.js), this project includes full user authentication, property management, booking functionality, and listing reviews.

---

## 🚀 Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### 🔹 Backend
- Node.js
- Express.js
- JWT Authentication
- Joi for validation

### 🔹 Database
- MongoDB (MongoDB Atlas)
- Mongoose ODM

---

## 🎯 Features

### 🖥️ Frontend
- Homepage with property cards (image, price, location)
- Property detail page:
  - Large and thumbnail image layout
  - Full description and pricing
  - Booking form with check-in, check-out, guests
  - **💬 Reviews section with user ratings and comments**
- Login and register pages with validation
- Responsive design using Tailwind CSS
- **💸 Simulated payment gateway for secure booking confirmation**
- **🤖 AI Chatbot for support and assistance**

### 🛠️ Backend API
- User authentication: `POST /auth/register`, `POST /auth/login`
- Listings:
  - `GET /listings`
  - `GET /listings/:id`
  - `POST /listings` 
  - `PUT /listings/:id`
  - `DELETE /listings/:id`
- Bookings: `POST /bookings`
- **Reviews: `POST /reviews`, `GET /listings/:id/reviews`**
- **Payments: `POST /listing/:id/payment`**

### 📦 Database Models
- **User**: name, email, password (hashed), isHost
- **Listing**: title, location, price, description, images, hostId
- **Booking**: userId, listingId, checkIn, checkOut, guests
- **Review**: listingId, userId, comment, rating
  
## 🌐 Live Demo

- 🔗 Frontend: [stay-finder.vercel.app](https://stay-finder-wheat.vercel.app)  
- 🔗 Backend: [stayfinder.onrender.com](https://stayfinder-1-84yg.onrender.com)

---

## 🧪 Seed Data
- Test users (hosts and guests)
- Sample listings with images from Unsplash
- Demo bookings and user reviews

---

## 🛠️ Getting Started (Local Setup)

```bash
git clone https://github.com/PriyankaKatare0/StayFinder.git
cd StayFinder
```

## 🔹 Backend

```
cd listing_server
npm install
npm start
```

##🔹 Frontend

```
cd StayFinder
npm install
npm run dev
```
