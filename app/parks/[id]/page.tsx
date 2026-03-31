"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditParkPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [hasPlayground, setHasPlayground] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPark() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parks/${id}`);
                const data = await res.json();
                setName(data.name);
                setCity(data.city);
                setHasPlayground(data.hasPlayground);
            } catch (error) {
                console.error("Failed to load park:", error);
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            loadPark();
        }
    }, [id]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, city, hasPlayground })
        });

        if (res.ok) {
            alert("Park updated");
            router.push("/parks");
        } else {
            alert("Error updating park");
        }
    }
    if (loading) {
        return <div className="p-6">Loading park details...</div>;
    }
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Edit Park</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
                <input type="text"
                placeholder="Park Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2"
                required
                 />
                <input type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-2"
                required
                 />
                 <label>
                    <input
                        type="checkbox"
                        checked={hasPlayground}
                        onChange={(e) => setHasPlayground(e.target.checked)}
                    />
                    Has Playground
                </label>
                <button type="submit" className="bg-yellow-500 text-black py-2">
                    Update Park
                </button>
            </form>
        </div>
    );
}