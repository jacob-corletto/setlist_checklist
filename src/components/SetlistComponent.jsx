import React from "react";
import { DownloadPlaylistButton } from "./downloadPlaylistButton";
import Cookies from "js-cookie";

const displayedArtists = new Set();

const SetlistComponent = ({ setlists }) => {
  const access_token = Cookies.get("spotify_access_token");
  const user_id = Cookies.get("spotify_id");
  return (
    <div className="p-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500">
      {setlists.map((setlist) => {
        if (setlist.songs.length > 0 && displayedArtists.has(setlist.artist)) {
          displayedArtists.add(setlist.artist);
          return (
            <div key={setlist.id} className="text-white">
              <h2 className="text-xl text-white font-bold mb-2">
                {setlist.artist}
              </h2>
            </div>
          );
        }
        return null;
      })}
      <div className="text-white grid grid-cols-2 md:grid-cols-2 gap-4 justify-evenly">
        {setlists.map(
          (setlist) =>
            setlist.songs.length > 0 && (
              <div
                key={setlist.id}
                className="bg-slate-800 p-4 border-2 rounded-lg border-slate-800 shadow-xl"
              >
                <h2 className="border-2 rounded-lg text-xl font-bold mb-2 text-center">{setlist.artist}</h2>
                <p>Venue: {setlist.venue}</p>
                <p>Date: {setlist.eventDate}</p>
                <p>Songs:</p>
                <ul className="list-none list-inside p-4">
                  {setlist.songs.map((song, index) => (
                    <li key={index}>
                      {index + 1}. {song}
                    </li>
                  ))}
                </ul>
                <DownloadPlaylistButton
                  access_token={access_token}
                  user_id={user_id}
                  tracks={setlist.songs}
                  artist={setlist.artist}
                  venue={setlist.venue}
                  eventDate={setlist.eventDate}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default SetlistComponent;
