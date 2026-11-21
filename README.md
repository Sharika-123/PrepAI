
# PrepAI – AI Interview Preparation Assistant

PrepAI is a full-stack web application designed to help students prepare for technical interviews. It provides subject-wise interview questions, difficulty levels, answer explanations, and performance tracking.

## Features

- Subject-wise technical interview questions
- Three difficulty levels: Beginner, Intermediate, and Advanced
- Answer explanations for each question
- Correct and incorrect answer tracking
- Score and accuracy calculation
- Practice progress bar
- Reset score option
- Automatic progress saving using Local Storage
- Responsive user interface

## Technologies Used

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Node.js
- Express.js
- REST API
- CORS

### Storage
- Browser Local Storage

## Subjects Available

1. Python
2. JavaScript
3. React
4. Node.js
5. SQL
6. DBMS
7. Operating Systems
8. Computer Networks

## Project Structure

```text
AI-Interview-Assistant/
├── backend/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── package.json
└── README.md
```

## How to Run the Project

### 1. Start the Backend

Open a terminal in the main project folder and run:

```bash
node backend/server.js
```

Backend runs at:

http://localhost:5000

### 2. Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm.cmd install
npm.cmd run dev
```

Open the local URL displayed by Vite, usually:

http://localhost:5173

## Future Improvements

- AI-powered interview question generation
- MongoDB integration
- User authentication
- Personalized interview recommendations
- More technical subjects and questions

## Author

Developed as a full-stack software development project.
