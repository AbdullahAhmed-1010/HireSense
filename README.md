# HireSense – Modern Job Portal Platform

HireSense is a full-stack job portal application designed to bridge the gap between job seekers and recruiters through a clean UI, scalable backend, and real-world production practices. It enables recruiters to post and manage jobs, while candidates can build profiles, upload resumes, and apply seamlessly.

Built with a modern React UI stack and a robust Node.js backend, HireSense focuses on performance, security, and extensibility — making it suitable for real-world deployment.

---

## Features

### Authentication & Roles

* Secure user authentication (JWT-based)
* Role-based access (Job Applicant / Recruiter)
* Profile creation and updates

### Job Management

* Create, update, and delete job postings
* Company profile management
* Job listings with detailed descriptions

### Resume & Media Handling

* Resume upload (PDF) using Multer
* Cloudinary integration for secure file storage
* Company logo uploads

### User Experience

* Modern, accessible UI using **shadcn/ui**
* Responsive design
* Form validation and feedback

### Database & API

* MongoDB with Mongoose schemas
* RESTful API design
* Proper error handling and validations

---

## Tech Stack

### Frontend

* React
* shadcn/ui (Radix UI + Tailwind CSS)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### File Storage

* Multer
* Cloudinary

---

## Project Structure (Simplified)

```
frontend/    # React + shadcn UI
backend/
 ├── controllers
 ├── routes
 ├── models
 ├── middleware
 ├── utils
 └── config
```

---

## Environment Variables

Create a `.env` file in the backend directory and configure the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Installation & Setup

### 1. Clone the Repository

```
git clone https://github.com/your-username/HireSense.git
cd HireSense
```

### 2. Backend Setup

```
cd backend
npm install
npm run dev
```

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## Why HireSense?

HireSense is built as an **industry-ready portfolio project** showcasing:

* Real-world backend architecture
* Secure file uploads
* Clean frontend design patterns
* Scalable and extensible codebase

---