const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function analyzeResume(fileBuffer) {
  try {
    // 1. Extract text from PDF
    const pdfData = await pdfParse(fileBuffer);
    const resumeText = pdfData.text;

    // 2. Prepare prompt for Gemini
    const prompt = `
      You are an expert technical recruiter and career coach.
      Analyze the following resume text and extract the information
      into a valid JSON object. JSON only, no extra text.

      Resume Text:
      """
      ${resumeText}
      """

      JSON Structure:
      {
        "name": "string | null",
        "email": "string | null",
        "phone": "string | null",
        "linkedin_url": "string | null",
        "portfolio_url": "string | null",
        "summary": "string | null",
        "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
        "education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }],
        "technical_skills": ["string"],
        "soft_skills": ["string"],
        "projects": ["string"],
        "certifications": ["string"],
        "resume_rating": "number (1-10)",
        "improvement_areas": ["string"],
        "upskill_suggestions": ["string"]
      }
    `;

    // 3. Call Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    // 4. Parse JSON output safely
    const text = result.response.text();
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const cleanJson = text.slice(jsonStart, jsonEnd + 1);

    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("Error in analyzeResume:", error);
    throw new Error("Resume analysis failed");
  }
}

module.exports = { analyzeResume };
