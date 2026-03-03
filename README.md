# 🎬 YT-Project

A full-stack YouTube-inspired web application built to learn and practice backend development with JavaScript. The project features a Node.js/Express backend paired with a frontend interface, covering core concepts like RESTful APIs, database integration, authentication, and file handling.

---

## 📁 Project Structure

```
YT-Project/
├── Backend/       # Node.js + Express server, APIs, DB models
├── Frontend/      # Client-side interface
└── README.md
```

---

## 🚀 Features

- 🔐 User authentication (register & login)
- 📹 Video upload and streaming
- 👍 Like, comment, and interact with videos
- 👤 User profile management
- 📡 RESTful API design
- 🗄️ MongoDB for persistent data storage

---

## 🛠️ Tech Stack

| Layer     | Technology                         |
|-----------|------------------------------------|
| Runtime   | Node.js                            |
| Backend   | Express.js                         |
| Database  | MongoDB (Mongoose ODM)             |
| Auth      | JWT (JSON Web Tokens)              |
| Uploads   | Multer / Cloudinary                |
| Frontend  | React.js (JavaScript)              |
| Styling   | Tailwind CSS                       |

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/varunbajpai16-sudo/YT-Project.git
cd YT-Project
```

---

### 2. Set Up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
npm start
# or for development with hot reload:
npm run dev
```

The server will run at `http://localhost:8000`.

---

### 3. Set Up the Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA).

> Tailwind CSS is pre-configured. Any changes to utility classes will reflect instantly via hot reload.

---

## 📬 API Endpoints

> All protected routes require a valid JWT token in the Authorization header.

### 👤 Users — `/api/v1/users`

| Method | Endpoint                          | Auth | Description                        |
|--------|-----------------------------------|------|------------------------------------|
| POST   | `/register`                       | ❌   | Register with avatar & cover image |
| POST   | `/login`                          | ❌   | Login and receive JWT              |
| POST   | `/logout`                         | ✅   | Logout current user                |
| POST   | `/refresh-token`                  | ❌   | Refresh access token               |
| PATCH  | `/change-password`                | ✅   | Change account password            |
| GET    | `/getuser`                        | ✅   | Get current logged-in user         |
| PATCH  | `/update-profile`                 | ✅   | Update name/email/etc.             |
| PATCH  | `/update-avatar`                  | ✅   | Upload new avatar image            |
| PATCH  | `/update-coverimage`              | ✅   | Upload new cover image             |
| GET    | `/getuserchannelprofile/:username`| ✅   | Get channel profile by username    |
| GET    | `/getwatchhistory`                | ✅   | Get current user's watch history   |

---

### 🎥 Videos — `/api/v1/videos`

| Method | Endpoint                    | Auth | Description                      |
|--------|-----------------------------|------|----------------------------------|
| GET    | `/getallvideos`             | ✅   | Get all videos                   |
| POST   | `/uploadvideo`              | ✅   | Upload video + thumbnail         |
| GET    | `/getvideobyid/:id`         | ✅   | Get a specific video             |
| PATCH  | `/updatevideo/:id`          | ✅   | Update video details             |
| DELETE | `/deletevideo/:id`          | ✅   | Delete a video                   |
| PATCH  | `/togglevideoprivacy/:id`   | ✅   | Toggle video public/private      |

---

### 💬 Comments — `/api/v1/comments`

| Method | Endpoint                          | Auth | Description               |
|--------|-----------------------------------|------|---------------------------|
| GET    | `/video-comments/:videoId`        | ✅   | Get all comments on video |
| POST   | `/add-comment`                    | ✅   | Add a comment to a video  |
| PATCH  | `/update-comment/:commentId`      | ✅   | Edit your comment         |
| DELETE | `/delete-comment/:commentId`      | ✅   | Delete your comment       |

---

### 👍 Likes — `/api/v1/likes`

| Method | Endpoint                      | Auth | Description                    |
|--------|-------------------------------|------|--------------------------------|
| POST   | `/like-video/:videoId`        | ✅   | Toggle like on a video         |
| POST   | `/like-comment`               | ✅   | Toggle like on a comment       |
| GET    | `/video-likes/:videoId`       | ✅   | Get like count for a video     |
| GET    | `/comment-likes/:commentId`   | ✅   | Get like count for a comment   |

---

### 📋 Playlists — `/api/v1/playlists`

| Method | Endpoint                          | Auth | Description                    |
|--------|-----------------------------------|------|--------------------------------|
| POST   | `/create-playlist`                | ✅   | Create a new playlist          |
| PATCH  | `/add-video`                      | ✅   | Add a video to a playlist      |
| PATCH  | `/delete-video`                   | ✅   | Remove a video from a playlist |
| GET    | `/user-playlist/:userid`          | ✅   | Get all playlists of a user    |
| GET    | `/playlist-by-id/:playlistId`     | ✅   | Get a specific playlist        |
| PATCH  | `/update-playlist/:playlistId`    | ✅   | Update playlist details        |
| DELETE | `/delete-playlist/:PlaylistId`    | ✅   | Delete a playlist              |

---

### 🔔 Subscriptions — `/api/v1/subscriptions`

| Method | Endpoint                  | Auth | Description                         |
|--------|---------------------------|------|-------------------------------------|
| POST   | `/toggle/:channelId`      | ✅   | Subscribe / Unsubscribe to channel  |

---

## 🧠 What I Learned

- Designing and building RESTful APIs from scratch
- Working with MongoDB and Mongoose schemas
- Handling file uploads with Multer and Cloudinary
- Implementing JWT-based authentication & authorization
- Structuring a full-stack JavaScript monorepo

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Varun Bajpai**  
GitHub: [@varunbajpai16-sudo](https://github.com/varunbajpai16-sudo)
