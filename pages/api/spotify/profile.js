const SPOTIFY_API_ENDPOINT = process.env.SPOTIFY_API_ENDPOINT;
export default async function handler(req, res) {
  const { spotify_access_token } = req.cookies;

  const response = await fetch(`${SPOTIFY_API_ENDPOINT}/me`, {
    headers: {
      Authorization: `Bearer ${spotify_access_token}`,
    },
  });

  const data = await response.json();
  res.status(200).json(data);
}
