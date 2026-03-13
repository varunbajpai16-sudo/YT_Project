import { useState } from "react";
import api from "../services/axiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function SettingsPage() {

  const user = useSelector((state) => state.auth.user);

  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // UPDATE PROFILE
  const updateProfile = async () => {
    try {

      const formData = new FormData();
      formData.append("username", username);
      formData.append("bio", bio);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      await api.patch("/users/update-profile", formData);

      toast.success("Profile updated successfully");

    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  // CHANGE PASSWORD
  const changePassword = async () => {
    try {

      await api.post("/users/change-password", {
        oldPassword,
        newPassword,
      });

      toast.success("Password changed successfully");

      setOldPassword("");
      setNewPassword("");

    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="max-w-[900px] mx-auto p-6 text-white">

      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      {/* PROFILE SETTINGS */}

      <div className="bg-zinc-900 p-6 rounded-xl mb-8">

        <h2 className="text-lg font-semibold mb-4">
          Profile Settings
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 bg-zinc-800 rounded outline-none"
          />

          <textarea
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            placeholder="Bio"
            className="w-full p-3 bg-zinc-800 rounded outline-none"
          />

          <input
            type="file"
            onChange={(e)=>setAvatar(e.target.files[0])}
            className="w-full"
          />

          <button
            onClick={updateProfile}
            className="bg-white text-black px-5 py-2 rounded-lg font-semibold"
          >
            Save Changes
          </button>

        </div>

      </div>

      {/* PASSWORD SETTINGS */}

      <div className="bg-zinc-900 p-6 rounded-xl">

        <h2 className="text-lg font-semibold mb-4">
          Change Password
        </h2>

        <div className="space-y-4">

          <input
            type="password"
            value={oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
            placeholder="Old Password"
            className="w-full p-3 bg-zinc-800 rounded outline-none"
          />

          <input
            type="password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full p-3 bg-zinc-800 rounded outline-none"
          />

          <button
            onClick={changePassword}
            className="bg-white text-black px-5 py-2 rounded-lg font-semibold"
          >
            Update Password
          </button>

        </div>

      </div>

    </div>
  );
}