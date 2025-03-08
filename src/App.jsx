import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import JobCard from "./Components/JobCard";
import { useEffect, useState } from "react";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);
  const [noJobsFound, setNoJobsFound] = useState(false);

  const fetchJobs = async () => {
    setCustomSearch(false);
    setNoJobsFound(false);

    const tempJobs = [];
    const jobsRef = query(collection(db, "jobs"), orderBy("postedOn", "desc"));
    const req = await getDocs(jobsRef);

    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
      });
    });

    setJobs(tempJobs);
  };

  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true);
    setNoJobsFound(false);

    let q = query(collection(db, "jobs"), orderBy("postedOn", "desc"));

    if (jobCriteria.type) q = query(q, where("type", "==", jobCriteria.type));
    if (jobCriteria.title)
      q = query(q, where("title", "==", jobCriteria.title));
    if (jobCriteria.experience)
      q = query(q, where("experience", "==", jobCriteria.experience));
    if (jobCriteria.location)
      q = query(q, where("location", "==", jobCriteria.location));

    const req = await getDocs(q);
    const tempJobs = [];

    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
      });
    });

    setJobs(tempJobs);
    if (tempJobs.length === 0) {
      setNoJobsFound(true);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom} />

      {customSearch && (
        <button onClick={fetchJobs} className="flex ml-[1150px] mb-2">
          <p className="bg-blue-500 px-10 py-2 rounded-md text-white">
            Clear Filters
          </p>
        </button>
      )}

      {noJobsFound && (
        <p className="text-white text-center mt-4 font-semibold">
          No jobs found for selected criteria.
        </p>
      )}

      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default App;
