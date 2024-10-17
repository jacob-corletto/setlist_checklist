// components/SetlistComponent.js
import React from "react";

const SetlistComponent = ({ setlists }) => {
  return (
    <div className="p-4">
      <div className="text-white ">
        {setlists.map(
          (setlist) =>
            setlist.songs.length > 0 && (
              <div key={setlist.id}>
                <h2>{setlist.artist}</h2>
                <p>Venue: {setlist.venue}</p>
                <p>Date: {setlist.eventDate}</p>
                <p>Songs:</p>
                <ul>
                  {setlist.songs.map((song, index) => (
                    <li key={index}>{song}</li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default SetlistComponent;
