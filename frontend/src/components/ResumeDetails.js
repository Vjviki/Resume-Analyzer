import {
  ArrowLeft,
  TrendingUp,
  Target,
  Lightbulb,
  User,
  Mail,
  Phone,
  Award,
  Briefcase,
} from "lucide-react";
import "./ResumeDetails.css";

const ResumeDetails = ({ data, onReset }) => {
  // console.log("ResumeDetails data:", data);
  const getRatingColor = (rating) => {
    if (rating >= 8) return "success";
    if (rating >= 6) return "warning";
    return "destructive";
  };

  return (
    <div className="analysis-container">
      {/* Header */}
      <div className="analysis-header">
        <button className="reset-btn" onClick={onReset}>
          <ArrowLeft className="icon-small" />
          Upload New Resume
        </button>
        <div className="header-text">
          <h2 className="header-title">Analysis Results</h2>
          <p className="header-subtitle">AI-powered insights for your resume</p>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="cards-grid">
        {/* Rating Card */}
        <div className="card">
          <div className="card-header">
            <TrendingUp className="icon-small card-icon" />
            <span>Overall Rating</span>
          </div>
          <div className="card-content rating-card">
            <div
              className={`rating-number ${getRatingColor(data.resumeRating)}`}
            >
              {data.resumeRating}
            </div>
            <div className="rating-max">/ 10</div>
            <div
              className={`progress-bar ${getRatingColor(data.resumeRating)}`}
            >
              <div
                className="progress-fill"
                style={{ width: `${data.resumeRating}0%` }}
              ></div>
            </div>
            <p className="rating-text">
              {data.resumeRating >= 8
                ? "Excellent resume!"
                : data.resumeRating >= 6
                ? "Good with room for improvement"
                : "Needs significant improvements"}
            </p>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="card">
          <div className="card-header">
            <User className="icon-small card-icon" />
            <span>Contact Information</span>
          </div>
          <div className="card-content">
            <div className="info-row">
              <User className="icon-small" />
              <span>{data.name}</span>
            </div>
            <div className="info-row">
              <Mail className="icon-small" />
              <span>{data.email}</span>
            </div>
            <div className="info-row">
              <Phone className="icon-small" />
              <span>{data.phone}</span>
            </div>
            <div className="skills-section">
              <p className="skills-title">
                <Award className="icon-small" /> Key Skills
              </p>
              <div className="skills-list">
                {data.technicalSkills.map((skill, idx) => (
                  <span key={idx} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience Card */}
        <div className="card">
          <div className="card-header">
            <Briefcase className="icon-small card-icon" />
            <span>Work Experience</span>
          </div>
          <div className="card-content">
            {data.workExperience.map((exp, idx) => (
              <div key={idx} className="experience-row">
                {exp}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Improvements & Skills */}
      <div className="cards-grid">
        {/* Improvements Card */}
        <div className="card">
          <div className="card-header">
            <Target className="icon-small card-icon" />
            <span>Areas for Improvement</span>
          </div>
          <div className="card-content">
            <ul className="improvements-list">
              {data.improvementAreas.map((item, idx) => (
                <li key={idx}>
                  <div className="improvement-index">
                    <span>{idx + 1}</span>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Skills Card */}
        <div className="card">
          <div className="card-header">
            <Lightbulb className="icon-small card-icon" />
            <span>Recommended Skills</span>
          </div>
          <div className="card-content">
            <p className="skills-text">
              Consider adding these in-demand skills to boost your profile:
            </p>
            <div className="skills-list">
              {data.upskillSuggestions.map((skill, idx) => (
                <span key={idx} className="skill-badge outlined">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDetails;
