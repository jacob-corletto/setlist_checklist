// import { basic, TOKEN_ENDPOINT, redirect_uri } from "../../../lib/spotify";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString("base64");

export default async function handler(req, res) {
  const { code } = req.query;

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirect_uri,
    }),
  });

  const tokens = await response.json();

  // Store tokens securely - this is just an example
  res.setHeader("Set-Cookie", [
    `spotify_access_token=${tokens.access_token}; Path=/;`,
    `spotify_refresh_token=${tokens.refresh_token}; Path=/;`,
  ]);

  res.redirect("/");
}
