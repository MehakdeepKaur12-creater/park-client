"use client";

import { useEffect, useState } from "react";

export default function ParksPage() {
  const [parks, setParks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadParks() {
      try {
        const res = await fetch("http://127.0.0.1:3001/api/parks");
        const data = await res.json();
        setParks(data);
      } catch (error) {
        console.error("Failed to fetch parks:", error);
      } finally {
        setLoading(false);
      }
    }

    loadParks();
  }, []);
async function deletePark(id: string){
  const res = await fetch(`http://127.0.0.1:3001/api/parks/${id}`,{
    method: "DELETE",
  });
  if (res.ok){
    alert("Park deleted");
    location.reload();
  } else{
    alert("Error deleting park");
  }
}
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Parks List</h1>

      {loading ? (
        <p>Loading parks...</p>
      ) : (
        parks.map((park: any) => (
          <div key={park._id} className="border p-4 mb-2">
            <h2 className="font-semibold">{park.name}</h2>
            <p>{park.city}</p>
            <p>Playground: {park.hasPlayground ? "Yes" : "No"}</p>

            <button
            onClick={() => deletePark(park._id)}
            className="bg-red-500 text-white px-2 py-1 mt-2">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}