"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "@/app/components/Container";

export default function DeleteIncident() {
  const router = useRouter();
  const { id } = useParams(); // Get the incident ID from the URL
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the incident details to confirm deletion
      axios
        .get(`https://emergency-backend-api.onrender.com/api/incident/${id}`)
        .then((response) => setIncident(response.data))
        .catch((error) =>
          console.error("Error fetching incident details:", error)
        );
    }
  }, [id]);

  const deleteIncident = async () => {
    await axios
      .delete(`https://emergency-backend-api.onrender.com/api/incident/${id}`)
      .then(() => {
        alert("Incident deleted successfully");
        router.push("/"); // Redirect to the homepage or a different page after deletion
      })
      .catch((error) => {
        console.error("Error deleting incident:", error);
      });
  };

  if (!incident)
    return (
      <Container>
        <p className="text-center text-lg font-semibold">Loading...</p>
      </Container>
    );

  return (
    <Container>
      <main className="p-3">
        <h2 className="text-3xl font-bold text-center">Delete Incident</h2>
        <p className="text-center text-lg">
          Are you sure you want to delete the incident titled:{incident.incidentLocation}
          <strong>{incident.title}</strong>?
        </p>
        <div className="flex justify-center mt-4">
          <button
            className="text-white font-bold bg-red-600 px-4 py-2 mr-2"
            onClick={deleteIncident}
          >
            Delete
          </button>
          <button
            className="text-white font-bold bg-gray-600 px-4 py-2 ml-2"
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
        </div>
      </main>
    </Container>
  );
}
