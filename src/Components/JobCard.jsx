import dayjs from "dayjs";

function JobCard({ job }) {
  const date1 = dayjs(Date.now());
  const diffInDays = date1.diff(job.postedOn.toDate(), "day");
  return (
    <div className="mx-40 mb-4">
      <div className="flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103 transition-transform duration-300 ease-in-out">
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-lg font-semibold">
            {job.title} - {job.company}
          </h1>
          <p>
            {job.type} &#x2022; {job.experience} &#x2022; {job.location}
          </p>
          <div className="flex items-center gap-2">
            {job.skills.map((skill, i) => (
              <p
                key={i}
                className="text-gray-500 py-1 px-2 rounded-md border border-black"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-gray-500">
            {diffInDays === 0
              ? "Posted today"
              : `Posted ${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`}
          </p>
          <a href={job.job_link} target="_blank" rel="noopener noreferrer">
            <button className="text-blue-500 border border-blue-500 px-10 py-2 rounded-md">
              Apply
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
