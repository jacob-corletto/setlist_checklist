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
        <button
          className="inline-flex items-center rounded-lg bg-transparent px-5 py-2.5 text-center text-white hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          type="button"
        >
          <a href="/api/auth/login">Login</a>
        </button>
      )}
    </div>
  );
}
