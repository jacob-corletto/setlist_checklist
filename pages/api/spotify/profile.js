// import getAccessToken from "../../../lib/spotify";
import { getAccessToken } from "../spotify";
import Cookies from "js-cookie";

const SPOTIFY_API_ENDPOINT = process.env.SPOTIFY_API_ENDPOINT;
export default async function handler(req, res) {
  const { spotify_access_token } = req.cookies;

  // console.log(req.cookies.spotify_refresh_token);
  // console.log(spotify_refresh_token);
  // console.log(spotify_access_token);
  // const newToken = getAccessToken(refresh_token);
  // console.log(newToken);

  if (!spotify_access_token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  try {
    console.log(`Fetching profile from: ${SPOTIFY_API_ENDPOINT}/me`);
    console.log(`Using access token: ${spotify_access_token}`);

    const response = await fetch(`${SPOTIFY_API_ENDPOINT}/me`, {
      headers: {
        Authorization: `Bearer ${spotify_access_token}`,
      },
    });

    console.log("this is the response in profile.js");
    console.log(response);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
