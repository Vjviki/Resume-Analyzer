import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { History, FileText, Calendar, TrendingUp, Eye } from "lucide-react";
import ResumeDetails from "./ResumeDetails";
import "./PastResumesTable.css";
export const PastResumesTable = () => {
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumeHistory, setResumeHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatData = (data) => {
    return {
      certifications: data.certifications || [],
      education: data.education || [],
      email: data.email || "N/A",
      fileName: data.file_name || "N/A",
      id: data.id,
      improvementAreas: Array.isArray(data.improvement_areas)
        ? data.improvement_areas
        : [],
      linkedinUrl: data.linkedin_url || "N/A",
      name: data.name || "N/A",
      phone: data.phone || "N/A",
      portfolioUrl: data.portfolio_url || "N/A",
      projects: (data.projects || []).map((eachItem) => eachItem),
      resumeRating: data.resume_rating || 0,
      softSkills: data.soft_skills || [],
      summary: data.summary || "",
      technicalSkills: data.technical_skills || [],
      uploadedAt: data.uploaded_at,
      upskillSuggestions: data.upskill_suggestions || [],
      workExperience: (data.work_experience || []).map((exp) =>
        typeof exp === "string"
          ? exp
          : `${exp.role} at ${exp.company} (${exp.duration})`
      ),
    };
  };

  // Fetch resumes from backend when component mounts
  useEffect(() => {
    const fetchResumes = async () => {
      try {
         const API_URL = process.env.REACT_APP_API_URL;
        const response = await fetch(`${API_URL}/api/resumes`);
        const data = await response.json();
        const formatted = data.map((resume) => formatData(resume));
        setResumeHistory(formatted);
        // console.log("Fetched Resumes:", formatted);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "green";
    if (rating >= 6) return "orange";
    return "red";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ReactLoading type="spin" color="#4a90e2" height={60} width={60} />
      </div>
    );
  }

  return (
    <div className="historical-viewer">
      <div className="card">
        <div className="card-header">
          <History className="icon" />
          <h2>Resume Analysis History</h2>
        </div>
        <div className="card-content">
          {resumeHistory.length === 0 ? (
            <div className="no-history">
              <FileText className="large-icon" />
              <h3>No Resume History</h3>
              <p>
                Upload your first resume to start tracking your improvements.
              </p>
            </div>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Upload Date</th>
                  <th>Rating</th>
                  <th>Top Skills</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {resumeHistory.map((resume) => (
                  <tr key={resume.id}>
                    <td data-label="File Name">
                      <div className="file-cell">
                        <FileText className="icon-small" />
                        {resume.fileName}
                      </div>
                    </td>
                    <td data-label="Upload Date">
                      <div className="date-cell">
                        <Calendar className="icon-small" />
                        {formatDate(resume.uploadedAt)}
                      </div>
                    </td>
                    <td data-label="Rating">
                      <div className="rating-cell">
                        <TrendingUp className="icon-small" />
                        <span
                          style={{ color: getRatingColor(resume.resumeRating) }}
                        >
                          {resume.resumeRating}/10
                        </span>
                      </div>
                    </td>
                    <td data-label="Top Skills">
                      <div className="skills-cell">
                        {(resume.technicalSkills || []).slice(0, 3).join(", ")}
                        {resume.technicalSkills.length > 3
                          ? ` +${resume.technicalSkills.length - 3}`
                          : ""}
                      </div>
                    </td>
                    <td data-label="Actions">
                      <div className="actions-cell">
                        <button
                          className="btn"
                          onClick={() => setSelectedResume(resume)}
                        >
                          <Eye className="icon-small" />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedResume && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setSelectedResume(null)}
            >
              &times;
            </button>
            <h3>Resume Analysis Details</h3>
            <ResumeDetails
              data={selectedResume}
              onReset={() => setSelectedResume(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PastResumesTable;
