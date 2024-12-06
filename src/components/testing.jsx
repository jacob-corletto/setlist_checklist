import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Test() {
  const [profile, setProfile] = useState(null);
  const [userName, setUserName] = useState("user");

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = Cookies.get("spotify_access_token");
      const refreshToken = Cookies.get("spotify_refresh_token");

      console.log(accessToken);
      console.log(refreshToken);

      if (accessToken && refreshToken) {
        const response = await fetch("/api/spotify/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setProfile(data);
        setUserName(data.display_name);
        console.log(data);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (response.ok) {
      setProfile(null);
      Cookies.remove("spotify_access_token");
      Cookies.remove("spotify_refresh_token");
    }
  };

  return (
    <div>
      {profile ? (
        <div>
          <button
            className="inline-flex items-center rounded-lg bg-transparent px-5 py-2.5 text-center text-white hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
          <p>hi {userName}</p>
        </div>
      ) : (
        <button
          className="inline-flex items-center rounded-lg bg-transparent px-5 py-2.5 text-center text-white hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          type="button"
        >
          <Link href="/api/auth/login">Login</Link>
        </button>
      )}
    </div>
  );
}
