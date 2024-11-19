import React from "react";
import Image from "next/image";

const UserProfile = ({ username, bio, profilePic }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-80 text-center">
      <div className="flex items-center justify-center mb-4">
        <Image
          src={profilePic}
          alt="Profile Picture"
          className="w-20 h-20 rounded-full mr-4"
        />
        <h1 className="text-xl font-bold">{username}</h1>
      </div>
      <div className="text-gray-600">
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default UserProfile;
