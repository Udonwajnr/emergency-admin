"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Navbar() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">Emergency Admin</Link>
        <div className="flex space-x-4">
          <button
            onClick={() => navigateTo("/user")}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            User
          </button>
          <button
            onClick={() => navigateTo("/")}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Incident
          </button>
          <button
            onClick={() => navigateTo("/post")}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Post
          </button>
        </div>
      </div>
    </nav>
  );
}
