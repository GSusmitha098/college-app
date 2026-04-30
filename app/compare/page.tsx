"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids");

  const [colleges, setColleges] = useState<any[]>([]);

  useEffect(() => {
    if (!ids) return;

    const idArray = ids.split(",");

    Promise.all(
      idArray.map((id) =>
        fetch(`http://localhost:5000/colleges/${id}`).then((res) =>
          res.json()
        )
      )
    ).then((data) => setColleges(data));
  }, [ids]);

  if (colleges.length === 0) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Compare Colleges</h1>

      <table className="table-auto border w-full">
        <thead>
          <tr>
            <th>Feature</th>
            {colleges.map((c) => (
              <th key={c.id}>{c.name}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Fees</td>
            {colleges.map((c) => (
              <td key={c.id}>₹{c.fees}</td>
            ))}
          </tr>

          <tr>
            <td>Rating</td>
            {colleges.map((c) => (
              <td key={c.id}>{c.rating}</td>
            ))}
          </tr>

          <tr>
            <td>Location</td>
            {colleges.map((c) => (
              <td key={c.id}>{c.location}</td>
            ))}
          </tr>

          <tr>
            <td>Placements</td>
            {colleges.map((c) => (
              <td key={c.id}>{c.placements}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}