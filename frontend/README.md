# Resume Analyzer

<img src="https://res.cloudinary.com/df73pocxs/image/upload/v1757323280/Screenshot_2025-09-08_144911_cb0m7o.png" alt="preview">

Resume Analyzer is a full-stack web application that helps users upload resumes and get AI-powered insights.  
It extracts key details, rates resumes, suggests improvements, and recommends skills to enhance career growth.

---

## Features

- Upload your resume (PDF format only)
- Extracts key details like **Name, Email, Phone, Skills, Projects, Education, Work Experience**
- Provides **AI-generated rating** out of 10
- Suggests **Areas for Improvement**
- Recommends **Upskilling Suggestions**
- Resume history tracking (view past uploads)

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL (or any other SQL database)
- **API Style:** REST API
- **LLM Integration:** Google Gemini API via `@google/generative-ai` SDK
- **PDF Parsing:** `pdf-parse` or a similar Node.js library

---

### AI / Model

- **LLM Provider:** Gemini AI
- **Default Model (configurable):** `gemini-1.5-flash`
  - You can change this via an environment variable: `MODEL_NAME`
- **System Prompt (summary):**

  > “You are an expert technical recruiter and career coach. Analyze the resume text and return a strict JSON object. JSON only—no extra text.”

  > If you used a different model, just set `MODEL_NAME` accordingly (e.g., `gpt-4.1`, `gpt-3.5-turbo`, etc.).

---

## Project Structure

```
resume-analyzer/
├── backend/
├── frontend/
├── sample_data/
└── screenshots/
```

- File Structure Backend:

```
backend/
├── routes/
│   └── resumeRoutes.js     # API route definitions
├── controllers/
│   └── resumeController.js # Logic to handle requests
├── services/
│   └── analysisService.js  # Business Logic (PDF, LLM)
├── db/
│   └── index.js            # DB Connection Setup
├── server.js               # Main Express server file
└── .env
```

- File Structure Frontend:

```
frontend/src/
└── components/
    ├── ResumeUploader.js # File input and upload button
    ├── ResumeUploader.css   
    ├── ResumeDetails.js  # Component to display the full analysis
    ├── ResumeDetails.js  
    ├── PastResumesTable.js # Table for historical data
    ├── PastResumesTable.css 
    └── App.js              # Main component with tabbing logic
```

### Preview

- Upload Page
  <img src="https://res.cloudinary.com/df73pocxs/image/upload/v1757323318/Screenshot_2025-09-08_145039_kr2zr1.png" alt="upload page">
- Resume History
  <img src="https://res.cloudinary.com/df73pocxs/image/upload/v1757323723/Screenshot_2025-09-08_145807_jajhq0.png" alt="upload page">
- Resume Analysis Details
  <img src="https://res.cloudinary.com/df73pocxs/image/upload/v1757321084/Screenshot_2025-09-08_141100_ggi4xb.png" alt="upload page">

---

### Setup Instructions

- Clone the repository

```
git clone https://github.com/your-username/resume-analyzer-pro.git
cd resume-analyzer-pro
```

- dependencies for backend

```
cd backend
npm install
```

- Install dependencies for frontend

```
cd ../frontend
npm install
```

- Start backend server

```
cd backend
npm start
```

- Start frontend server

```
cd frontend
npm start
```

- Open the app at:
  http://localhost:3000


## License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute it with attribution.

© 2025 Vignesh . All rights reserved.