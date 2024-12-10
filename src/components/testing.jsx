import { useEffect, useState } from "react";
import Link from "next/link";

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

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (response.ok) {
      setProfile(null);
    }
  };

  return (
    <div>
      {profile ? (
        <button
          className="inline-flex items-center rounded-lg bg-transparent px-5 py-2.5 text-center text-white hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 hover:shadow-xl"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="inline-flex items-center rounded-lg bg-transparent px-5 py-2.5 text-center text-white hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 hover:shadow-xl"
          type="button"
        >
          <Link href="/api/auth/login">Login</Link>
        </button>
      )}
    </div>
  );
}
