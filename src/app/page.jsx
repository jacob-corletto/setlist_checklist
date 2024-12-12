// pages/index.js
"use client";
import { useState } from "react";
import axios from "axios";
import SetlistComponent from "@/components/SetlistComponent";
import styles from ".//page.module.css";
import NearbyEventsPage from "@/components/ConcertGrid";
// import TopTracks from "@/components/TopTracks";
import Test from "@/components/testing";
import DropdownMenu from "@/components/DropdownMenu";
// import "styles/globals.css";
import GetRecs from "@/components/getRecs";

export default function Home() {
  const [artistName, setArtistName] = useState("");
  const [setlists, setSetlists] = useState([]);
  const [Error, setError] = useState(null);

  const fetchSetlists = async () => {
    try {
      const response = await axios.get(
        `/api/setlists?artistName=${artistName}`,
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
    <div className="bg-black-600  p-4">
      <div className="p-4 flex flex-col sm:flex-row items-center justify-between bg-transparent border-0 border-white-500 rounded-md">
        <div className="text-3xl font-bold text-white justify-start">
          Setlist Checklist
        </div>
        <div className="justify-end flex">
          <ul className="flex space-x-4 items-center px-4">
            <Test />
            <li>
              <a
                href="/about"
                className="inline-flex items-center rounded-lg bg-transparent px-5 py-2.5 text-center text-white hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              >
                {" "}
                About{" "}
              </a>
            </li>
          </ul>
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
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-500"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-lg text-white pt-2">
        Welcome back User check out whats going on...
      </div>
      <NearbyEventsPage />
      {/* <TopTracks /> */}
      <div className="">
        {Error ? (
          <p>Artist not found try another or try again later</p>
        ) : (
          <div className="rounded-sm bg-black text-white">
            <SetlistComponent setlists={setlists} />
          </div>
        )}
        <GetRecs artistName={artistName} />
      </div>
    </div>
  );
}
