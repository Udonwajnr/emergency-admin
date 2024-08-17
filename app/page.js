"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Container from "./components/Container";
export default function Home() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get("https://emergency-backend-api.onrender.com/api/incident")
      .then(response => setIncidents(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const generateMapLink = (location) => {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  };

  const handleEdit = (id) => {
    console.log(`Edit incident with id: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    console.log(`Delete incident with id: ${id}`);
    // Implement delete functionality here
  };

  const handleView = (id) => {
    console.log(`View incident with id: ${id}`);
    // Implement view functionality here
  };

  return (
    <Container>
      <main className="p-3">
      <h1 className="text-2xl font-semibold mb-4">Incident Table Table</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">incidentLocation</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">comment</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">natureOfIncident</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">fileUrl</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">user</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidents.length > 0 ? incidents.map(incident => (
                <tr key={incident._id}>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{incident._id}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    <a href={generateMapLink(incident.incidentLocation)} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {incident.incidentLocation}
                    </a>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{incident.comment || "No comment"}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{incident.natureOfIncident}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    {incident.fileUrl ? (
                      <a href={incident.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View File</a>
                    ) : (
                      "No file"
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{incident.user}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    <Link href={`incident/${incident._id}`} className="text-green-500 hover:underline mr-2">View</Link>
                    <Link href="" className="text-red-500 hover:underline">Delete</Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700 text-center">No incidents found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </Container>
  );
}
