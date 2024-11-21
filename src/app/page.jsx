// pages/index.js
"use client";
import { useState } from "react";
import axios from "axios";
import SetlistComponent from "@/components/SetlistComponent";
import styles from ".//page.module.css";
import ConcertGrid from "@/components/ConcertGrid";
import TopPlayedSongs from "@/components/TopPlayedSongs";
// import "styles/globals.css";

export default function Home() {
  const [artistName, setArtistName] = useState("");
  const [setlists, setSetlists] = useState([]);
  const [Error, setError] = useState(null);

  const fetchSetlists = async () => {
    try {
      const response = await axios.get(
        `/api/setlists?artistName=${artistName}`
      );
      setSetlists(response.data.setlists);
      setError(null);
    } catch (error) {
      console.error("Error fetching setlists:", error);
      setError("Error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSetlists();
  };

  return (
    <div className="bg-gray-600  p-4">
      <div className="p-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-4xl font-bold text-white">Setlist Checklist</div>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="Search artist..."
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-500"
          >
            Search
          </button>
        </form>
      </div>
      <div className="text-center text-lg text-white">
        Welcome back User check out whats going on...
      </div>
      <ConcertGrid />
      <div className="">
        {Error ? (
          <p>Artist not found try another or try again later</p>
        ) : (
          <div className="rounded-sm bg-black text-white">
            <TopPlayedSongs setlists={setlists} />
            <SetlistComponent setlists={setlists} />
          </div>
        )}
      </div>
    </div>
  );
}
