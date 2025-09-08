const db = require("../db");
const analysisService = require("../services/analysisService");

// Upload + analyze + save resume
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await analysisService.analyzeResume(req.file.buffer);

    const sql = `
      INSERT INTO resumes 
      (file_name, name, email, phone, linkedin_url, portfolio_url, summary, 
       work_experience, education, technical_skills, soft_skills, projects, 
       certifications, resume_rating, improvement_areas, upskill_suggestions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [
      req.file.originalname,
      result.name,
      result.email,
      result.phone,
      result.linkedin_url,
      result.portfolio_url,
      result.summary,
      JSON.stringify(result.work_experience),
      JSON.stringify(result.education),
      JSON.stringify(result.technical_skills),
      JSON.stringify(result.soft_skills),
      JSON.stringify(result.projects),
      JSON.stringify(result.certifications),
      result.resume_rating,
      JSON.stringify(result.improvement_areas),
      JSON.stringify(result.upskill_suggestions),
    ]);

    res.json({
      message: "Resume uploaded & analyzed successfully",
      data: result,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to process resume" });
  }
};

// Get all resumes
exports.getAllResumes = (req, res) => {
  db.all("SELECT * FROM resumes ORDER BY uploaded_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const resumes = rows.map((row) => ({
      ...row,
      work_experience: row.work_experience
        ? JSON.parse(row.work_experience)
        : [],
      education: row.education ? JSON.parse(row.education) : [],
      technical_skills: row.technical_skills
        ? JSON.parse(row.technical_skills)
        : [],
      soft_skills: row.soft_skills ? JSON.parse(row.soft_skills) : [],
      projects: row.projects ? JSON.parse(row.projects) : [],
      certifications: row.certifications ? JSON.parse(row.certifications) : [],
      improvement_areas: row.improvement_areas
        ? JSON.parse(row.improvement_areas)
        : [],
      upskill_suggestions: row.upskill_suggestions
        ? JSON.parse(row.upskill_suggestions)
        : [],
    }));

    res.json(resumes);
  });
};

// Get resume by ID
exports.getResumeById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM resumes WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Resume not found" });

    const resume = {
      ...row,
      work_experience: row.work_experience
        ? JSON.parse(row.work_experience)
        : [],
      education: row.education ? JSON.parse(row.education) : [],
      technical_skills: row.technical_skills
        ? JSON.parse(row.technical_skills)
        : [],
      soft_skills: row.soft_skills ? JSON.parse(row.soft_skills) : [],
      projects: row.projects ? JSON.parse(row.projects) : [],
      certifications: row.certifications ? JSON.parse(row.certifications) : [],
      improvement_areas: row.improvement_areas
        ? JSON.parse(row.improvement_areas)
        : [],
      upskill_suggestions: row.upskill_suggestions
        ? JSON.parse(row.upskill_suggestions)
        : [],
    };

    res.json(resume);
  });
};
