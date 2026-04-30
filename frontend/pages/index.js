import { useEffect, useState } from "react";

export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");

  const fetchColleges = async () => {
    const res = await fetch(`http://localhost:5000/colleges?search=${search}`);
    const data = await res.json();
    setColleges(data);
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">College Finder</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search colleges..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={fetchColleges}
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        Search
      </button>

      {/* College Cards */}
      <div className="grid grid-cols-3 gap-4">
        {colleges.map((college) => (
          <div key={college.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{college.name}</h2>
            <p>{college.location}</p>
            <p>Fees: ₹{college.fees}</p>
            <p>Rating: {college.rating}</p>

            <a
              href={`/college/${college.id}`}
              className="text-blue-500"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}