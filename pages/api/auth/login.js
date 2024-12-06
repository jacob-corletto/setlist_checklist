export default function handler(req, res) {
  const scope =
    "user-read-private user-read-email playlist-read-private playlist-read-public playlist-modify-public playlist-modify-private";

  const queryParams = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: scope,
  });

  res.redirect(
    `https://accounts.spotify.com/authorize?${queryParams.toString()}`
  );
}
