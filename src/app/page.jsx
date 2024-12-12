// pages/index.js
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SetlistComponent from "@/components/SetlistComponent";
import styles from ".//page.module.css";
import NearbyEventsPage from "@/components/ConcertGrid";
// import TopTracks from "@/components/TopTracks";
import Test from "@/components/testing";
import DropdownMenu from "@/components/DropdownMenu";
// import "styles/globals.css";
import Cookies from "js-cookie";

export default function Home() {
  const [artistName, setArtistName] = useState("");
  const [setlists, setSetlists] = useState([]);
  const [Error, setError] = useState(null);
  const [userName, setUserName] = useState("User");
  const [accessToken, setAccessToken] = useState(null); // State variable for access token

  const getAccessToken = async () => {
    try {
      const token = Cookies.get("spotify_access_token"); // Adjust based on your storage mechanism
      if (token) {
        setAccessToken(token);
      } else {
        // Handle case where token is not found (e.g., redirect to login)
        console.warn("Access token not found. Consider redirecting to login.");
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (accessToken) {
        // Only fetch profile data if access token exists
        try {
          const response = await fetch("/api/spotify/profile", {
            headers: { Authorization: `Bearer ${accessToken}` }, // Include access token in authorization header
          });
          const data = await response.json();
          setUserName(data.display_name);
          console.log(data);
          console.log(Cookies.get("spotify_id"));
        } catch (error) {
          console.error("Error fetching profile data:", error);
          // Handle errors gracefully (e.g., token expiration)
        }
      }
    };

    getAccessToken(); // Fetch access token on component mount
    fetchProfile();
  }, [accessToken]); // Re-fetch profile data whenever access token changes

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
    <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 p-4">
      <div className="p-4 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 border-0 border-slate-800 rounded-lg">
        <div className="text-3xl font-bold text-white justify-start">
          Setlist Checklist
        </div>
        <div className="justify-end flex">
          <ul className="flex space-x-4 items-center px-4">
            <Test />
            <li>
              <a href="/about" className="inline-flex items-center rounded-lg bg-transparent px-5 py-2.5 text-center text-white hover:bg-purple-500 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                {" "}
                About{" "}
              </a>
            </li>
          </ul>
          <form onSubmit={handleSubmit} className="flex items-center space-x-2 shadow-xl">
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Search artist..."
              className="p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 hover:shadow-xl transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-lg text-white p-8 drop-shadow-xl">
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
      </div>
    </div>
  );
}
