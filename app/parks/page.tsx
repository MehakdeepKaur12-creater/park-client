"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

export default function ParksPage() {
  const [parks, setParks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState<Record<string, {
    visitorName: string;
    rating: string;
    comment: string;
  }>>({});

  useEffect(() => {
    async function loadParks() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parks`);
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parks/${id}`,{
    method: "DELETE",
  });
  if (res.ok){
    alert("Park deleted");
    location.reload();
  } else{
    alert("Error deleting park");
  }
}
function handleReviewChange(
  parkId: string, 
  field: string, 
  value: string) 
  {
  setReviewData(prev => ({
    ...prev,
    [parkId]: {
      visitorName: prev[parkId]?.visitorName || "",
      rating: prev[parkId]?.rating || "",
      comment: prev[parkId]?.comment || "",
      [field]: value,
    },
  }));
}

async function addReview(parkId: string, e: FormEvent) {
  e.preventDefault();
  const review = reviewData[parkId];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parks/${parkId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      visitorName: review?.visitorName || "",
      rating: Number(review?.rating || 0),
      comment: review?.comment || "",
    }),
  });

  if (res.ok) {
    alert("Review added");
    location.reload();
  } else {
    alert("Error adding review");
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
            <div className="mt-3 flex gap-2">
      
            <Link
            href={`/parks/${park._id}`} 
            className="bg-yellow-500 text-black px-2 py-1">
              Edit
            </Link>

            <button
            onClick={() => deletePark(park._id)}
            className="bg-red-500 text-white px-2 py-1">
              Delete
            </button>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Reviews</h3>
            {park.reviews && park.reviews.length > 0 ? (
              park.reviews.map((review: any) => (
                <div key={review._id} className="border p-2 mb-2">
                  <p><strong>Name:</strong> {review.visitorName}</p>
                  <p><strong>Rating:</strong> {review.rating}</p>
                  <p><strong>Comment:</strong> {review.comment}</p>
                </div>
              ))
            ) : (
              <p className="mb-2">No reviews yet.</p>
            )}

            <form onSubmit={(e) => addReview(park._id, e)} className="flex flex-col gap-2 max-w-md mt-2">
              <input
                type="text"
                placeholder="Your Name"
                value={reviewData[park._id]?.visitorName || ""}
                onChange={(e) => handleReviewChange(park._id, "visitorName", e.target.value)}
                className="border p-2"
                required
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                value={reviewData[park._id]?.rating || ""}
                onChange={(e) => handleReviewChange(park._id, "rating", e.target.value)}
                className="border p-2"
                required
              />
              <input
                type="text"
                placeholder="Your Comment"
                value={reviewData[park._id]?.comment || ""}
                onChange={(e) => handleReviewChange(park._id, "comment", e.target.value)}
                className="border p-2"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-2"
              >
                Add Review
              </button>
            </form>

          </div>
        </div>
      ))
    )}
    </div>
  );
}