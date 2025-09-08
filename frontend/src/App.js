import React, { useState } from "react";
import { Sparkles, FileText, History } from "lucide-react";
import ResumeUploader from "./components/ResumeUploader";
import PastResumesTable from "./components/PastResumesTable";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("analysis");

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-title">
            <div className="icon-wrapper">
              <Sparkles className="icon" />
            </div>
            <h1 className="main-title">Resume Analyzer</h1>
          </div>
          <p className="subtitle">
            Get AI-powered insights to improve your resume with intelligent
            analysis, skill recommendations, and career guidance.
          </p>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "analysis" ? "active" : ""}`}
            onClick={() => setActiveTab("analysis")}
          >
            <FileText className="icon" /> Resume Analysis
          </button>
          <button
            className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            <History className="icon" /> History
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "analysis" && <ResumeUploader />}
          {activeTab === "history" && <PastResumesTable />}
        </div>
      </div>
    </div>
  );
}
