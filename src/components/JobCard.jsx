import React, { useState, useEffect } from "react";
import Map from "../assets/icons/Map";
import Company from "../assets/icons/Company";
import Category from "../assets/icons/Category";
import Saved from "../assets/icons/Saved";
import Unsaved from "../assets/icons/Unsaved";
import "../styles/JobListing.css";

function JobCard({ job, onSave }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setIsSaved(savedJobs.some((savedJob) => savedJob.id === job.id));
  }, [job.id]);

  const handleSave = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (isSaved) {
      const updatedSavedJobs = savedJobs.filter(
        (savedJob) => savedJob.id !== job.id
      );
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
    } else {
      localStorage.setItem("savedJobs", JSON.stringify([...savedJobs, job]));
    }

    setIsSaved(!isSaved);
    if (onSave) onSave();
  };

  return (
    <div className={`job-card ${job.featured ? "featured" : ""}`}>
      <div className="job-header">
        <h3>{job.title}</h3>
        <button
          className={`save-btn ${isSaved ? "saved" : ""}`}
          onClick={handleSave}
          aria-label={isSaved ? "Unsave job" : "Save job"}
        >
          {isSaved ? <Saved /> : <Unsaved />}
        </button>
      </div>
      <div className="job-company">
        <Company />
        {job.company}
      </div>
      <div className="job-location">
        <Map />
        {job.location}
      </div>
      <div className="job-category">
        <Category />
        {job.category}
      </div>
      <ul className="job-features">
        {job.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <p className="job-date">
        Date posted: {new Date(job.date).toLocaleDateString("en-GB")}
      </p>
      {job.featured && <div className="featured-badge">Featured</div>}
    </div>
  );
}

export default JobCard;
