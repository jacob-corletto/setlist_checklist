import { useEffect, useState } from "react";

export default function Test() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/spotify/profile");
      const data = await response.json();
      setProfile(data);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <h1>Welcome {profile.display_name}!</h1>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <a href="/api/auth/login">Login with Spotify</a>
      )}
    </div>
  );
}
