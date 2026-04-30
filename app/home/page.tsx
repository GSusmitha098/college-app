"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
};

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const router = useRouter();

  const fetchColleges = async () => {
    const res = await fetch(`http://localhost:5000/colleges?search=${search}`);
    const data = await res.json();
    setColleges(data);
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleSelect = (id: number, checked: boolean) => {
    if (checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((item) => item !== id));
    }
  };

  const handleCompare = () => {
    if (selected.length < 2) {
      alert("Please select at least 2 colleges");
      return;
    }
    router.push(`/compare?ids=${selected.join(",")}`);
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="p-5">
      {/* 🔥 TOP BAR */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">College Finder</h1>

        <div className="flex gap-2">
          {/* Saved Colleges Button */}
          <button
            onClick={() => router.push("/saved")}
            className="bg-purple-500 text-white px-3 py-1 rounded"
          >
            Saved Colleges
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search colleges..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex gap-2 mb-4">
        <button
          onClick={fetchColleges}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Search
        </button>

        <button
          onClick={handleCompare}
          className="bg-green-500 text-white px-4 py-2"
        >
          Compare
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        {colleges.map((college) => (
          <div key={college.id} className="border p-4 rounded shadow">
            <input
              type="checkbox"
              className="mb-2"
              onChange={(e) => handleSelect(college.id, e.target.checked)}
            />

            <h2 className="text-lg font-semibold">{college.name}</h2>
            <p>{college.location}</p>
            <p>Fees: ₹{college.fees}</p>
            <p>Rating: {college.rating}</p>

            <Link href={`/college/${college.id}`} className="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}