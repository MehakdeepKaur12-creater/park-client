import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white p-4 flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/parks">List Parks</Link>
            <Link href="/parks/add">Add Park</Link>
        </nav>
    );
}