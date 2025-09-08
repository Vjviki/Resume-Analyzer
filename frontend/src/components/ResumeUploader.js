import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import ResumeDetails from "./ResumeDetails";
// import SampleResume from "../sample_data/SampleResume";
import "./ResumeUploader.css";

const ResumeUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisData, setAnalysisData] = useState(null);

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


  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);
    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      // Prepare form data
      const formData = new FormData();
      formData.append("resume", file);

      // Upload to backend
      const response = await fetch("http://localhost:5000/api/resumes/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload resume");
      }

      const result = await response.json();
      const formattedResult = formatData(result.data);
      // console.log("Analysis Result:", formattedResult);
      setTimeout(() => {
        setUploadProgress(100);
        setAnalysisData(formattedResult);
        setIsUploading(false);
        alert("Analysis Complete! Your resume has been analyzed successfully.");
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setIsUploading(false);
      setUploadProgress(0);
      alert("There was an error analyzing your resume.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  if (analysisData) {
    return (
      <ResumeDetails
        data={analysisData}
        onReset={() => setAnalysisData(null)}
      />
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <Upload className="icon upload-icon" /> Upload Your Resume
        </h2>
      </div>

      <div>
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} />
          <div className="dropzone-content">
            <div className="icon-wrapper">
              <FileText className="icon file-icon" />
            </div>
            {isDragActive ? (
              <p className="drop-text active-text">Drop your resume here...</p>
            ) : (
              <>
                <p className="drop-text">Drag & drop your resume here</p>
                <p className="sub-text">or click to browse files</p>
              </>
            )}
            <p className="sub-text small-text">Supports PDF files up to 10MB</p>
          </div>
        </div>

        {isUploading && (
          <div className="upload-status">
            <div className="status-row">
              <div className="spinner"></div>
              <span className="status-text">
                {uploadProgress < 50
                  ? "Uploading resume..."
                  : uploadProgress < 90
                  ? "Extracting data..."
                  : "Analyzing with AI..."}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="info-grid">
          <div className="info-item success">
            <CheckCircle className="icon small-icon" />
            <span>Secure & Private</span>
          </div>
          <div className="info-item info">
            <CheckCircle className="icon small-icon" />
            <span>AI-Powered Analysis</span>
          </div>
          <div className="info-item warning">
            <AlertCircle className="icon small-icon" />
            <span>PDF Format Only</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;
