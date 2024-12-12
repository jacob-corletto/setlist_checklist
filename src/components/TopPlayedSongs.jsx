import React from "react";
import { useState, useEffect } from "react";
import { DownloadPlaylistButton } from "./downloadPlaylistButton";
import Cookies from "js-cookie";

const TopPlayedSongs = ({ setlists }) => {
  const access_token = Cookies.get("spotify_access_token");
  const user_id = Cookies.get("spotify_id");
  const [songCounts, setSongCounts] = useState(new Map());
  const [artist, setArtist] = useState("");

  useEffect(() => {
    const newSongCounts = new Map();
    let artistName = "";
    setlists.forEach((setlist) => {
      artistName = setlist.artist;
      setlist.songs.forEach((song) => {
        newSongCounts.set(song, (newSongCounts.get(song) || 0) + 1);
      });
    });
    setSongCounts(newSongCounts);
    setArtist(artistName);
  }, [setlists]);

  const sortedSongs = [...songCounts.entries()].sort((a, b) => b[1] - a[1]);
  const top20 = sortedSongs.slice(0, 20);
  const top20SongNames = top20.map(([song, count]) => song);

  return (
    <div>
      {top20.length > 0 && ( // Conditional rendering check
        <div className="bg-gray-200 rounded-lg p-4 shadow-md text-black">
          <h1>Top Songs Played at Concerts</h1>
          <ul className="grid grid-cols-2 gap-1">
            {top20.map(([song, count], index) => (
              <li key={index} className="py-2">
                {song}
              </li>
            ))}
          </ul>
          <DownloadPlaylistButton
            access_token={access_token}
            user_id={user_id}
            tracks={top20SongNames}
            artist={artist}
            venue={""}
            eventDate={""}
          />
        </div>
      )}
    </div>
  );
};
export default TopPlayedSongs;
