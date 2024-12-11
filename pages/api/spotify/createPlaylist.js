export default async function handler(req, res) {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ message: "Method not allowed" });
  // }

  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(" ")[1]; // Extract the token from the header
  const { userId, name, description, isPublic, tracks, artist } = req.body;

  try {
    const createPlaylistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          public: isPublic,
        }),
      }
    );
    console.log(name, description, isPublic);

    if (!createPlaylistResponse.ok) {
      throw new Error("Failed to create playlist");
    }

    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;

    const songs = await searchTracks(accessToken, tracks, artist);
    await addTracksToPlaylist(accessToken, playlistId, songs);

    res
      .status(201)
      .json({ message: "Playlist created and tracks added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function searchTracks(accessToken, tracks, artist) {
  console.log("Search Tracks:", tracks);

  const trackUris = [];
  for (const track of tracks) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        track
      )}&type=track&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const responseBody = await response.json();
    const filteredTracks = responseBody.tracks.items.filter((track) =>
      track.artists.some((a) => a.name.toLowerCase() === artist.toLowerCase())
    );
    if (filteredTracks.length > 0) {
      trackUris.push(filteredTracks[0].uri);
    }
  }
  console.log("Filtered Track URIs:", trackUris);
  return trackUris;
}

async function addTracksToPlaylist(accessToken, playlistId, tracks) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: tracks,
      }),
    }
  );

  // console.log("Add Tracks Response:", response);
  if (!response.ok) {
    throw new Error("Failed to add tracks to playlist");
  }
}
