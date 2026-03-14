import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosInstance";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../features/auth/auth.slice";

export default function ModernRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clearstates = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      const data = { username, email, password };

      const res = await api.post("/user/login", data);

      dispatch(
        loginSuccess({
          user: res.data.data,
        })
      );

      clearstates();
      toast.success("Login successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl border-[3px] border-black overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="bg-red-600 text-white p-6 sm:p-10 md:p-12 flex flex-col justify-between">

          <div>

            {/* Logo */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl tracking-widest font-semibold">
                YouTube
              </h2>
            </div>

            <p className="text-white text-xs md:text-sm mb-2 tracking-wider">
              BEGIN YOUR JOURNEY
            </p>

            <h1 className="text-2xl md:text-4xl font-bold mb-8 md:mb-10">
              Sign Up Now
            </h1>

            {/* Username */}
            <div className="mb-4">
              <label className="text-xs md:text-sm block mb-2">USERNAME</label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name..."
                className="w-full bg-transparent border border-white/40 px-4 py-2 md:py-3 rounded-md focus:outline-none focus:border-white"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-xs md:text-sm block mb-2">PASSWORD</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
                className="w-full bg-transparent border border-white/40 px-4 py-2 md:py-3 rounded-md focus:outline-none focus:border-white"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="text-xs md:text-sm block mb-2">
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-transparent border border-white/40 px-4 py-2 md:py-3 rounded-md focus:outline-none focus:border-white"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 mb-6 md:mb-8 text-xs md:text-sm">
              <input type="checkbox" className="accent-white" />
              <span>I Accept the Terms & Conditions</span>
            </div>

            {/* Button */}
            <button
              className="bg-white text-black w-full md:w-auto px-6 py-3 font-semibold tracking-wide rounded-md hover:cursor-pointer"
              onClick={HandleSubmit}
            >
              LOGIN NOW
            </button>

          </div>

          {/* Social */}
          <div className="mt-8">
            <p className="text-xs mb-3 tracking-widest">SIGN UP WITH</p>

            <div className="flex gap-4">

              <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dsoggdof4/image/upload/v1773480398/image_g5mfgf.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dsoggdof4/image/upload/v1773480397/github_urihtx.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative bg-white flex flex-col">

          {/* Top Nav */}
          <div className="flex justify-between items-center p-6 md:p-8">

            <div className="hidden sm:flex gap-6 md:gap-10 text-gray-600 text-xs md:text-sm">
              <span className="cursor-pointer hover:text-black">Services</span>
              <span className="cursor-pointer hover:text-black">Pricing</span>
              <span className="cursor-pointer hover:text-black">Support</span>
            </div>

            <button
              className="bg-black text-white px-4 md:px-5 py-2 text-xs md:text-sm rounded-md hover:cursor-pointer"
              onClick={() => navigate("/register")}
            >
              REGISTER NOW
            </button>

          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center p-6 md:p-8">

            <img
              src="https://res.cloudinary.com/dsoggdof4/image/upload/v1773480397/YT_logo_ewms6u.avif"
              alt="YouTube"
              className="max-h-[220px] md:max-h-[500px] object-contain"
            />

          </div>

        </div>

      </div>

    </div>
  );
}