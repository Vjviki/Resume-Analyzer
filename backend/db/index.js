const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbpath = path.resolve(__dirname, "resumes.db");
const db = new sqlite3.Database(dbpath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    email TEXT,
    phone TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    summary TEXT,
    work_experience TEXT, -- store JSON as TEXT
    education TEXT,
    technical_skills TEXT,
    soft_skills TEXT,
    projects TEXT,
    certifications TEXT,
    resume_rating INTEGER,
    improvement_areas TEXT,
    upskill_suggestions TEXT
  )
`);

module.exports = db;
