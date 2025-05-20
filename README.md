# MERN Blog App

A full-stack blog application built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js) that allows users to create, read, update, and delete blog posts with a clean, responsive UI.

---

## Features

- User authentication and authorization (signup/login)
- Create, edit, update, and delete blog posts
- Upload and display images for blog posts
- Responsive UI built with Material-UI
- Real-time updates on posts
- Categorize blog posts by topic
- RESTful API backend with Express and MongoDB

---

## Tech Stack

| Layer          | Technology                |
|----------------|--------------------------|
| Frontend       | React.js, Material-UI     |
| Backend        | Node.js, Express.js       |
| Database       | MongoDB (Atlas)     |
| Authentication | JWT (JSON Web Tokens)     |


---

## Getting Started

### Prerequisites

- Node.js & npm installed
- MongoDB Atlas account or local MongoDB installed
- (Optional) Cloudinary account for image uploads

### Installation

1. **Clone the repo**
    ```
    git clone https://github.com/yourusername/mern-blog-app.git
    cd mern-blog-app
    ```

2. **Setup backend**
    ```
    cd server
    npm install
    ```

3. **Setup frontend**
    ```
    cd ../client
    npm install
    ```

4. **Environment Variables**

    Create a `.env` file in the `backend` folder with:

    ```
    DB=your_mongodb_uri
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ACCESS_SECRET_KEY=your-access-secret
    REFRESH_SECRET_KEY=your-refresh-secret
    ```

5. **Running the Application**

    In separate terminals:

    ```
    # Start backend server
    cd server
    npm run start
    ```

    ```
    # Start frontend dev server
    cd client
    npm run start
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Contributions

Feel free to fork, submit pull requests, or report issues!

---

## Contact

Abhijit Das - sadabhijit2004@gmail.com

Project Link: [Click Here](https://github.com/dasabhijit2004/blog-website)
