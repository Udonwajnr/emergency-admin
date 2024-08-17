// pages/incident/[id].js
"use client"
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "@/app/components/Container";
export default function IncidentDetail() {
  const router = useRouter();
  const { id } = useParams(); // Use useParams to get the incident ID from the URL
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://emergency-backend-api.onrender.com/api/incident/${id}`)
        .then(response => setIncident(response.data))
        .catch(error => console.error("Error fetching incident details:", error));
    }
  }, [id]);

  if (!incident) return <p className="text-center text-lg font-semibold">Loading...</p>;
  console.log(incident)
  return (
    <Container>
        <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-4">
            <h1 className="text-3xl font-bold">Incident Details</h1>
            </div>
            <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Incident Information</h2>
                <p className="mb-2"><span className="font-bold">Incident ID:</span> {incident._id}</p>
                <p className="mb-2"><span className="font-bold">Location:</span> 
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(incident.incidentLocation)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline">
                    {incident.incidentLocation}
                    </a>
                </p>
                <p className="mb-2"><span className="font-bold">Nature of Incident:</span> {incident.natureOfIncident}</p>
                <p className="mb-2"><span className="font-bold">Comment:</span> {incident.comment || "No comment"}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
                <p className="mb-2"><span className="font-bold">File URL:</span> 
                    {incident.fileUrl ? 
                    <a href={incident.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline">
                        View File
                    </a> 
                    : "No file"}
                </p>
                <p className="mb-2"><span className="font-bold">User:</span> {incident.user}</p>
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button 
                onClick={() => router.back()} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Back
                </button>
            </div>
            </div>
        </div>
        </div>
    </Container>
  );
}
