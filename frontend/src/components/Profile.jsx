import React, { useState } from "react";


function Profile() {
  const [user] = useState({
    name: "Demo User",
    email: "demo@queueaway.com",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="text-center w-full max-w-md bg-white rounded-xl p-8 shadow">
    <h2 className="font-bold text-2xl mb-3">Profile</h2>
    <div className="text-lg font-semibold mb-2">{user.name}</div>
    <div className="text-gray-500 mb-4">{user.email}</div>
    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">Edit Profile</button>
  </div>
</div>
  );
}

export default Profile;
