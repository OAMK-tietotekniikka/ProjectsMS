# Company-Oriented Product Development Projects Management Tool

This application is a project management tool that allows Information Technology students and teachers at Oulu university of Applied Sciences to manage company-oriented product development projects. It provides a centralized platform where students can create and modify projects and add documents and notes to their projects, and where teachers can view project documents, make notes to projects, and modify data related to projects. The application is automatically assigning a supervising teacher to a new project created by a student; this is done based on teacher's resources and saved company favourities. The application is also providing a platform for teachers to manage resources and view list of ongoing and past supervised projects.

### Students participating in the creation of this application are:
- Liisa Törmäkangas
- Bao Tran

## Table of Contents
- [Technologies Used](#technologies-used)
  - [Frontend Client](#frontend-client)
  - [Backend Server API](#backend-server-api)
  - [Database](#database)
  - [Development Environment](#development-environment)
- [How to Run the Application](#how-to-run-the-application)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [License](#license)

## Technologies used
### Frontend client
- React as a frontend JavaScript library
- TypeScript as a programming language
- Vite as a frontend build tool
- MSAL as a Microsoft Authentication Library
- React-Router-Dom as a routing library
- React-Bootstrap as a CSS framework
- Axios as a promise-based HTTP client
- i18next as an language localisation framework

### Backend server API
- Node.js as a backend JavaScript runtime
- Express as a backend web application framework
- TypeScript as a programming language
- MSAL as a Microsoft Authentication Library
- Nodemailer as an email sending library
- jsonwebtoken as a JSON web token library
- mysql2 as a relational database management system
- dotenv as a zero-dependency module that loads environment variables from a .env file into process.env

### Database
- MySQL as a relational database management system

### Development environment
- Docker as a containerization platform
- Docker Compose as a tool for defining and running multi-container Docker applications
- ESLint as a static code analysis tool

## How to run the application
### Prerequisites
If not installed yet:
- Install Node.js (https://nodejs.org/en/download/package-manager/current) which by default includes npm (None Package Manager)
- Install Git (https://git-scm.com/downloads)
- Install Docker Desktop (https://docs.docker.com/get-started/get-docker/)

Clone the repository to your local computer, and navigate to the relevant folder:
```bash
  git clone https://github.com/OAMK-tietotekniikka/ProjectsMS.git
  cd ProjectsMS
```
### Frontend setup
- Change directory to *frontend* folder
- Install dependencies for the frontend client:
```bash
  npm install
```
- During development phase when running the application locally in Docker, the *frontend/Dockerfile* run command must be set as:
```bash
  CMD ["npm", "run", "preview"]
```
- When merging to main branch and deploying the application to production in OpenShift containers, the *frontend/Dockerfile* run command must be set as:
```bash
  CMD ["npm", "run", "start"]
```
### Backend setup
- Change directory to *server* folder
- Install dependencies for the backend server:
```bash
  npm install
```
- During development phase when running the application locally in Docker, comment out the following line in the *server/src/app.ts* file:
```bash
  // createTables();
```
- When merging to main branch and deploying the application to production in OpenShift containers, and if recreation of db tables is needed in OpenShift MySQL container, uncomment the following line in the *server/src/app.ts* file:
```bash
  createTables();
```
### Database setup
- Create a .env file to *server* add the following content:
```bash
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=pwd@123
  DB_NAME=studentsdb
  DB_Port=3307
  DB_CONNECTION_LIMIT=20
  SERVER_PORT=8080
```

### Start the application
- To run the application locally, navigate to the ProjectMS root folder, and execute the following command:
```bash
  docker-compose up --build
```
