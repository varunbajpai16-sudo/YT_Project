import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/axiosInstance";
import Lottie from "lottie-react";
import registerLoading from "../../public/loding.json";

export default function RegisterPage() {
const nevigate = useNavigate();
const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
fullname: "",
username: "",
email: "",
password: "",
avatar: null,
coverImage: null,
});

const handleSubmit = async (e) => {
e.preventDefault();


try {
  const data = new FormData();

  data.append("fullname", formData.fullname);
  data.append("username", formData.username);
  data.append("email", formData.email);
  data.append("password", formData.password);
  data.append("avatar", formData.avatar);
  data.append("coverImage", formData.coverImage);

  setLoading(true);

  const response = await api.post("user/register", data);

  if (response.status === 200) {
    toast.success("Registered successfully!");

    setTimeout(() => {
      nevigate("/login");
    }, 1000);
  }

} catch (error) {
  toast.error(error.response?.data?.message || "Registration failed");
} finally {
  setLoading(false);
}


};

const HandelChange = (e) => {
const { name, value, files } = e.target;

if (files) {
  setFormData((prev) => ({
    ...prev,
    [name]: files[0],
  }));
} else {
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
}


};

return ( <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-6">


  <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

    {/* LEFT SIDE */}
    <div className="bg-red-600 text-white p-6 sm:p-10 md:p-14">

      <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-wide">
        YouTube
      </h2>

      <p className="uppercase text-xs md:text-sm tracking-widest mb-2">
        Begin Your Journey
      </p>

      <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">
        Sign Up Now
      </h1>

      <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>

        {/* Fullname */}
        <div>
          <label className="block text-xs md:text-sm mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={HandelChange}
            placeholder="Enter your name..."
            className="w-full px-4 py-2 md:py-3 bg-transparent border border-white rounded-md focus:outline-none"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs md:text-sm mb-2">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={HandelChange}
            placeholder="Enter your username..."
            className="w-full px-4 py-2 md:py-3 bg-transparent border border-white rounded-md focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs md:text-sm mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={HandelChange}
            placeholder="Enter your email..."
            className="w-full px-4 py-2 md:py-3 bg-transparent border border-white rounded-md focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs md:text-sm mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={HandelChange}
            placeholder="Enter your password..."
            className="w-full px-4 py-2 md:py-3 bg-transparent border border-white rounded-md focus:outline-none"
          />
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-xs md:text-sm mb-2">
            Avatar
          </label>

          <input
            type="file"
            name="avatar"
            onChange={HandelChange}
            className="w-full text-sm file:bg-white file:text-red-600 file:px-4 file:py-2 file:rounded-md file:border-0 file:cursor-pointer bg-transparent border border-white rounded-md"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-xs md:text-sm mb-2">
            Cover Image
          </label>

          <input
            type="file"
            name="coverImage"
            onChange={HandelChange}
            className="w-full text-sm file:bg-white file:text-red-600 file:px-4 file:py-2 file:rounded-md file:border-0 file:cursor-pointer bg-transparent border border-white rounded-md"
          />
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <input type="checkbox" />
          <span>I accept the Terms & Conditions</span>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-red-600 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
        >
          {loading ? "Registering..." : "REGISTER NOW"}
        </button>

      </form>
    </div>

    {/* RIGHT SIDE */}
    <div className="bg-white flex items-center justify-center p-6 md:p-10">

      {loading ? (
        <div className="flex flex-col items-center gap-6">
          <Lottie
            animationData={registerLoading}
            loop
            className="w-48 md:w-80"
          />

          <p className="text-gray-600 text-sm md:text-lg font-semibold">
            Registering....
          </p>
        </div>
      ) : (
        <img
          src="/YT_logo.avif"
          alt="YouTube Logo"
          className="max-h-[200px] md:max-h-[500px] object-contain"
        />
      )}

    </div>

  </div>
</div>


);
}
