import React from "react";

const displayedArtists = new Set();

const SetlistComponent = ({ setlists }) => {
  return (
    <div className="p-4">
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
                className="bg-transparent p-4 border-2 rounded-lg border-gray-200"
              >
                {/* <h2 className="text-xl font-bold mb-2">{setlist.artist}</h2> */}
                <p>Venue: {setlist.venue}</p>
                <p>Date: {setlist.eventDate}</p>
                <p>Songs:</p>
                <ul className="list-disc list-inside">
                  {setlist.songs.map((song, index) => (
                    <li key={index}>{song}</li>
                  ))}
                </ul>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default SetlistComponent;
