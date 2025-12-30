# JobScout — Job Discovery & AI Referral Assistant Platform 🚀

JobScout is a full-stack web application that helps users discover job and internship opportunities from multiple sources, bookmark relevant roles, manage their profile, and generate AI-powered LinkedIn referral messages tailored to specific job descriptions.

This project focuses on real-world backend architecture, secure authentication, and practical AI integration.

---

## ✨ Features

### 🔍 Job Discovery
- Aggregates job and internship listings scraped from:
  - Company career pages
  - Internshala
- Unified interface for browsing opportunities across platforms

### 📄 Job Details
- Fetches and displays full job descriptions
- Caches job descriptions in the database to reduce repeated scraping

### ⭐ Bookmarks
- Save jobs for later review
- Instantly add/remove bookmarks with real-time UI updates
- Centralized Saved Jobs page

### 🤖 AI Referral Message Generator
- Generates personalized LinkedIn referral messages using AI
- Uses job title, company, job description, and user profile data
- Produces:
  - Connection message
  - Detailed referral request message
- Clean UI with expandable accordion sections

### 👤 User Profile
- Secure authentication using JWT
- Profile data used to personalize referral messages

---

## 🛠 Tech Stack

### Frontend
- Next.js
- React.js
- Tailwind CSS
- shadcn/ui
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Web Scraping & Caching
- REST APIs

### AI Integration
- Groq API (LLaMA-based models)

---

## 🧠 Architecture Highlights

- Clear separation of concerns (routes, controllers, services)
- Backend-driven job and profile resolution
- Cached job descriptions to optimize scraping
- Protected APIs with authentication middleware
- Stateless frontend with clean API contracts

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

git clone https://github.com/Aryantvats/JobScout.git  
cd JobScout  

---

### 2️⃣ Install dependencies

Backend

cd server  
npm install  
npm run server

Frontend

cd frontend 
npm install  
npm run dev  

---

### 3️⃣ Environment Variables

Create a `.env` file inside the `server` directory:

PORT=3080  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
GROQ_API_KEY=your_groq_api_key  

---

### 4️⃣ Open the app

Frontend: http://localhost:3000  
Backend API: http://localhost:3080  

---

## 🔐 Authentication Flow

JobScout uses JWT-based authentication to secure user data and protected APIs.

Signup  
- User registers with email and password  
- Password is securely hashed before storage  
- A new user profile is created  

Login  
- User logs in with valid credentials  
- Backend generates a JWT token  
- Token is stored on the client  

Protected Routes  
- JWT is attached to protected API requests via Authorization header  
- Backend middleware validates the token  
- Unauthorized requests return 401  

User Context  
- Authenticated user data is fetched on app load  
- Used for bookmarks, referral generation, and dashboards  

---

## 📈 Future Improvements
- Job application tracking (Applied / Interview / Offer)
- Referral history per job
- Multiple AI-generated variations
- Copy/edit referral messages before sending
- Company-wise analytics

---

## 👨‍💻 Author

Aryan Tyagi  

GitHub: https://github.com/Aryantvats  
LinkedIn: https://www.linkedin.com/in/aryan-tyagi-754126289/

---

## ⭐ If you like this project
Consider giving it a ⭐ on GitHub — it helps a lot!
