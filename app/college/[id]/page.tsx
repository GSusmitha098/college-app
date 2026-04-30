"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  courses: string;
  placements: string;
};

export default function CollegeDetail() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [college, setCollege] = useState<College | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/colleges/${id}`)
      .then((res) => res.json())
      .then((data) => setCollege(data))
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!college) return <p>Loading...</p>;

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      const confirmLogin = window.confirm(
        "Login required to save this college.\n\nClick OK to continue to login."
      );

      if (confirmLogin) {
        router.push(`/login?redirect=/college/${college.id}`);
      }

      return;
    }

    try {
      await fetch("http://localhost:5000/colleges/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          college_id: college.id,
        }),
      });

      alert("Saved!");
    } catch (err) {
      console.log(err);
      alert("Error saving college");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">{college.name}</h1>

      <p><strong>Location:</strong> {college.location}</p>
      <p><strong>Fees:</strong> ₹{college.fees}</p>
      <p><strong>Rating:</strong> {college.rating}</p>

      <h2 className="text-xl mt-4">Courses</h2>
      <p>{college.courses}</p>

      <h2 className="text-xl mt-4">Placements</h2>
      <p>{college.placements}</p>

      <button
        onClick={handleSave}
        className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded"
      >
        Save College
      </button>
    </div>
  );
}