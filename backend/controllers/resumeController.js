const pool = require("../db");
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
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *
    `;

    const values = [
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
    ];

    const dbRes = await pool.query(sql, values);

    res.json({
      message: "Resume uploaded & analyzed successfully",
      data: dbRes.rows[0],
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to process resume" });
  }
};

// Get all resumes
exports.getAllResumes = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM resumes ORDER BY uploaded_at DESC"
    );
    const resumes = result.rows.map((row) => ({
      ...row,
      work_experience: row.work_experience || [],
      education: row.education || [],
      technical_skills: row.technical_skills || [],
      soft_skills: row.soft_skills || [],
      projects: row.projects || [],
      certifications: row.certifications || [],
      improvement_areas: row.improvement_areas || [],
      upskill_suggestions: row.upskill_suggestions || [],
    }));
    res.json(resumes);
  } catch (err) {
    console.error("Get All Resumes Error:", err);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
};

// Get resume by ID
exports.getResumeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM resumes WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Resume not found" });

    const row = result.rows[0];
    const resume = {
      ...row,
      work_experience: row.work_experience || [],
      education: row.education || [],
      technical_skills: row.technical_skills || [],
      soft_skills: row.soft_skills || [],
      projects: row.projects || [],
      certifications: row.certifications || [],
      improvement_areas: row.improvement_areas || [],
      upskill_suggestions: row.upskill_suggestions || [],
    };
    res.json(resume);
  } catch (err) {
    console.error("Get Resume By ID Error:", err);
    res.status(500).json({ error: "Failed to fetch resume" });
  }
};
