// import getAccessToken from "../../../lib/spotify";

const SPOTIFY_API_ENDPOINT = process.env.SPOTIFY_API_ENDPOINT;
export default async function handler(req, res) {
  const { spotify_access_token } = req.cookies;

  if (!spotify_access_token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  try {
    const response = await fetch(`${SPOTIFY_API_ENDPOINT}/me`, {
      headers: {
        Authorization: `Bearer ${spotify_access_token}`,
      },
    });

    const data = await response.json();

    res.setHeader("Set-Cookie", [`spotify_id =${data.id}; Path=/;`]);

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
