"use client";

import { useEffect, useState } from "react";

export default function SavedPage() {
  const [saved, setSaved] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) return;

    fetch(`http://localhost:5000/colleges/saved/${user.id}`)
      .then((res) => res.json())
      .then((data) => setSaved(data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Saved Colleges</h1>

      {saved.length === 0 ? (
  <p>No saved colleges</p>
) : (
  <div className="grid grid-cols-3 gap-4">
    {saved.map((c: any) => (
      <div key={c.id} className="border p-4 rounded shadow">
        <h2 className="font-semibold">{c.name}</h2>
        <p>{c.location}</p>
        <p>Fees: ₹{c.fees}</p>
        <p>Rating: {c.rating}</p>
      </div>
    ))}
  </div>
)}
    </div>
  );
}