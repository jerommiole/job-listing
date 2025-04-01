import React, { useState, useEffect } from "react";
import "./App.css";
import JobCard from "./components/JobCard";
import DropdownSort from "./components/DropdownSort";
import jobsData from "../src/data/jobs.json";

function App() {
  const [jobs, setJobs] = useState([]);
  const [savedJobsCount, setSavedJobsCount] = useState(0);

  useEffect(() => {
    setJobs(jobsData);

    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobsCount(savedJobs.length);
  }, []);

  const handleSortChange = (sortType) => {
    let sortedJobs = [...jobs];

    switch (sortType) {
      case "company":
        sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case "date":
        sortedJobs.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "relevance":
      default:
        sortedJobs = [...jobsData];
        break;
    }

    setJobs(sortedJobs);
  };

  const updateSavedJobsCount = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobsCount(savedJobs.length);
  };
  return (
    <div className="container">
      <h1 className="title">Job Listings</h1>
      <h2 className="subtitle">
        Explore a variety of exciting job opportunities in different industries.
        Find your perfect match today!
      </h2>
      <div className="job-controls">
        <DropdownSort onSortChange={handleSortChange} />
        <div className="saved-count">Saved Jobs: {savedJobsCount}</div>
      </div>
      <div className="jobs-container">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onSave={updateSavedJobsCount} />
        ))}
      </div>
      <div className="footer">
        <span>Build by</span>
        <a
          className="footer-link"
          href="https://www.linkedin.com/in/jerommiole/"
          target="_blank"
        >
          {" "}
          Jerom
        </a>
      </div>
    </div>
  );
}

export default App;
