export default async function handler(req, res) {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ message: "Method not allowed" });
  // }

  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(" ")[1]; // Extract the token from the header
  const { userId, name, description, isPublic, tracks } = req.body;

  // console.log(req.headers);
  // console.log(req.body);
  // console.log(accessToken);
  // console.log("User ID:", userId);
  // console.log("Name:", name);
  // console.log("Description:", description);
  // console.log("Public:", isPublic);
  // console.log("Tracks:", tracks);

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
    console.log("Create Playlist Response:", createPlaylistResponse);

    if (!createPlaylistResponse.ok) {
      throw new Error("Failed to create playlist");
    }

    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;

    await addTracksToPlaylist(accessToken, playlistId, tracks);

    res
      .status(201)
      .json({ message: "Playlist created and tracks added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

  if (!response.ok) {
    throw new Error("Failed to add tracks to playlist");
  }
}
