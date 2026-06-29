# Hackathon Team Finder API

A RESTful backend API built with the MERN stack that helps hackathon participants register, showcase their skills, and discover compatible teammates for projects.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Environment Config:** dotenv

---

## Project Structure

```
task_1/
├── configdb/
│   └── mongodb.js          # MongoDB connection setup
├── middleware/
│   └── authMiddleware.js   # JWT verification middleware
├── models/
│   └── User.js             # User schema and model
├── routes/
│   ├── auth.js             # Register and login routes
│   └── users.js            # User profile and match routes
├── .env                    # Environment variables (not committed)
├── package.json
└── server.js               # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hackathon-team-finder-api.git

# Navigate into the project
cd hackathon-team-finder-api

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hackathon
JWT_SECRET=your_secret_key_here
```

### Run the Server

```bash
node server.js
```

Server runs on `http://localhost:5000`

---

## API Endpoints

### Auth Routes

#### Register a new user
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "Altamash",
  "email": "altamash@gmail.com",
  "password": "123456",
  "skills": ["React", "Node.js"],
  "role": "fullstack"
}
```

**Response `201`:**
```json
{
  "message": "User registered successfully",
  "token": "<jwt_token>",
  "user": {
    "id": "6a4221d2715d711880dfd754",
    "name": "Altamash",
    "email": "altamash@gmail.com",
    "skills": ["React", "Node.js"],
    "role": "fullstack",
    "available": true
  }
}
```

---

#### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "altamash@gmail.com",
  "password": "123456"
}
```

**Response `200`:**
```json
{
  "message": "Login successful",
  "token": "<jwt_token>",
  "user": { ... }
}
```

---

### User Routes

#### Get all users
```
GET /users
```

No authentication required. Returns all users without passwords.

**Response `200`:**
```json
[
  {
    "_id": "6a4221d2715d711880dfd754",
    "name": "Altamash",
    "email": "altamash@gmail.com",
    "skills": ["React", "Node.js", "MongoDB"],
    "role": "fullstack",
    "available": true,
    "createdAt": "2026-06-29T07:42:10.828Z"
  }
]
```

---

#### Update your profile 🔒
```
PUT /users/profile
```

**Protected route** — requires Bearer token in Authorization header.

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "skills": ["React", "Node.js", "MongoDB"],
  "role": "fullstack",
  "available": true
}
```

**Response `200`:**
```json
{
  "message": "Profile updated",
  "user": { ... }
}
```

---

#### Find teammates by skill or role
```
GET /users/matches?skill=React
GET /users/matches?role=backend
GET /users/matches?skill=React&role=fullstack
```

Filters users who are **available** and match the given skill or role.

**Response `200`:**
```json
[
  {
    "_id": "6a4221d2715d711880dfd754",
    "name": "Altamash",
    "skills": ["React", "Node.js", "MongoDB"],
    "role": "fullstack",
    "available": true
  }
]
```

---

## User Schema

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Full name of the user |
| `email` | String | Unique email address |
| `password` | String | Hashed with bcryptjs |
| `skills` | [String] | e.g. `["React", "Node.js"]` |
| `role` | String | `frontend`, `backend`, `fullstack`, `designer`, `ml`, `other` |
| `available` | Boolean | Whether user is looking for a team |
| `createdAt` | Date | Auto-generated timestamp |

---

## Authentication

This API uses **JWT (JSON Web Tokens)** for authentication.

1. Register or login to receive a token
2. Include the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after **7 days**.

---

## Error Responses

| Status Code | Meaning |
|-------------|---------|
| `400` | Bad request / Email already registered |
| `401` | Unauthorized / Invalid token |
| `404` | User or resource not found |
| `500` | Internal server error |

---

## Future Enhancements

- [ ] Project idea posting and team invites
- [ ] Real-time team recommendations
- [ ] Hackathon role and availability filtering
- [ ] Frontend interface for team discovery
- [ ] Pagination for `/users` endpoint

---

## Author

**Altamash** — Backend Intern  
[GitHub](https://github.com/Star90lord) • [LinkedIn](https://www.linkedin.com/in/altamash-malik/)