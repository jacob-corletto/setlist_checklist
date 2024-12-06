import React, { useState } from "react";

const downloadPlaylist = async (access_token, user_id, tracks) => {
  try {
    const response = await fetch("/api/spotify/createPlaylist", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user_id,
        tracks: tracks,
        name: "New Playlist",
        description: "New playlist description",
        isPublic: false,
      }),
    });
    return response.json();
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
};

const DownloadPlaylistButton = ({ access_token, user_id, tracks }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await downloadPlaylist(access_token, user_id, tracks);
      console.log("Creating playlist with tracks:", tracks);
      console.log("Creating playlist with user_id:", user_id);
      console.log("Creating playlist with access_token:", access_token);
    } catch (error) {
      console.error("Error creating playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Creating Playlist..." : "Create Playlist"}
    </button>
  );
};

export default DownloadPlaylistButton;
