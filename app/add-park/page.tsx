"use client";
import { useState, type FormEvent} from "react";

export default function AddParkPage() {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [hasPlayground, setHasPlayground] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const res = await fetch("http://127.0.0.1:3001/api/parks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, city, hasPlayground })
        });
        if (res.ok) {
            alert("Park added");
            setName("");
            setCity("");
            setHasPlayground(false);
        } else {
            alert("Error adding park");
        }
    }
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Add Park</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
                <input
                type="text"
                placeholder="Park Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2"
                required
            />
            <input 
            type="text"
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
            <button type="submit" className="bg-blue-500 text-white p-2">
                Add Park
            </button>
            </form>
        </div>
    );
}
