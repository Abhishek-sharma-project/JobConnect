import React, { useState } from "react";

function SearchBar({ fetchJobsCustom }) {
  const defaultCriteria = {
    title: "",
    location: "",
    experience: "",
    type: "",
  };

  const [jobCriteria, setJobCriteria] = useState(defaultCriteria);

  const handleChange = (e) => {
    setJobCriteria((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const search = () => {
    fetchJobsCustom(jobCriteria);
    setJobCriteria({
      title: "",
      location: "",
      experience: "",
      type: "",
    });
  };

  return (
    <div className="flex flex-col items-center my-10 px-10">
      <div className="flex gap-4 justify-center">
        <select
          onChange={handleChange}
          name="title"
          value={jobCriteria.title}
          className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md outline-none"
        >
          <option value="" disabled hidden>
            Job Role
          </option>
          <option value="iOS Developer">iOS Developer</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Android Developer">Android Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
        </select>

        <select
          onChange={handleChange}
          name="type"
          value={jobCriteria.type}
          className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md outline-none"
        >
          <option value="" disabled hidden>
            Job Type
          </option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
        </select>

        <select
          onChange={handleChange}
          name="location"
          value={jobCriteria.location}
          className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md outline-none"
        >
          <option value="" disabled hidden>
            Location
          </option>
          <option value="Remote">Remote</option>
          <option value="In-Office">In-Office</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <select
          onChange={handleChange}
          name="experience"
          value={jobCriteria.experience}
          className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md outline-none"
        >
          <option value="" disabled hidden>
            Experience
          </option>
          <option value="Fresher">Fresher</option>
          <option value="Junior Level">Junior Level</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior Level">Senior Level</option>
        </select>

        <button
          onClick={search}
          className="w-64 bg-blue-500 text-white font-bold py-3 rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
