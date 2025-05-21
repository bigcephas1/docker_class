# MERN Todo App with Docker

This is a simple Todo application built with the MERN stack (MongoDB, Express, React, Node.js) and configured for Docker deployment.

## Features

- Add new todos
- Mark todos as complete
- Delete todos
- Persistent data storage with MongoDB

## Docker Concepts Covered

1. **Custom Images**: Building images for both frontend and backend
2. **Volumes**: Persistent storage for MongoDB data
3. **Networks**: Communication between containers
4. **Multi-stage builds**: Optimizing production images

## How to Run

1. Make sure Docker is installed on your system
2. Clone this repository
3. Run the following command:

```bash
docker-compose up --build
