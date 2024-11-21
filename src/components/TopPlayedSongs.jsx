import React from "react";
import { useState, useEffect } from "react";

const TopPlayedSongs = ({ setlists }) => {
  const [songCounts, setSongCounts] = useState(new Map());

  useEffect(() => {
    const newSongCounts = new Map();
    setlists.forEach((setlist) => {
      setlist.songs.forEach((song) => {
        newSongCounts.set(song, (newSongCounts.get(song) || 0) + 1);
      });
    });
    setSongCounts(newSongCounts);
  }, [setlists]);

  const sortedSongs = [...songCounts.entries()].sort((a, b) => b[1] - a[1]);
  const top20 = sortedSongs.slice(0, 20);

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
        </div>
      )}
    </div>
  );
};
export default TopPlayedSongs;
