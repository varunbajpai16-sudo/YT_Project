import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosInstance";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
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
      const data = {
        username,
        email,
        password,
      };

      const res = await api.post("/user/login", data);

      dispatch(
        loginSuccess({
          user: res.data.data,
        }),
      );
      clearstates();
      console.log(res.data);
      toast.success("Login successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
          toast.error(error.message)
    }
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      {/* Outer Frame */}
      <div className="w-full max-w-6xl bg-white rounded-3xl border-[3px] border-black overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE - DARK FORM */}
        <div className="bg-red-600 text-white p-12 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="mb-12">
              <h2 className="text-2xl tracking-widest font-semibold">
                YouTube
              </h2>
            </div>

            <p className="text-white text-sm mb-2 tracking-wider">
              BEGIN YOUR JOURNEY
            </p>

            <h1 className="text-4xl font-bold mb-10">Sign Up Now</h1>

            {/* Username */}
            <div className="mb-5">
              <label className="text-sm text-white block mb-2">USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name..."
                className="w-full bg-transparent border broder-black px-4 py-3 focus:outline-none focus:border-white"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="text-sm text-white block mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
                className="w-full bg-transparent border broder-black px-4 py-3 focus:outline-none focus:border-white"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="text-sm text-white block mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-transparent border broder-black px-4 py-3 focus:outline-none focus:border-white"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 mb-8 text-sm text-white">
              <input type="checkbox" className="accent-white" />
              <span>I Accept the Terms & Conditions</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-6 mb-3">
              <button
                className="bg-white text-black px-6 py-3 font-semibold tracking-wide  hover:cursor-pointer rounded-md "
                onClick={HandleSubmit}
              >
                LOGIN NOW
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div>
            <p className="text-white text-xs mb-4 tracking-widest">
              SIGN UP WITH
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-white rounded-full">
                <a href="">
                  <img
                    src="../public/image.png"
                    alt=""
                    className=" rounded-full"
                  />
                </a>
              </div>
              <div className="w-8 h-8 bg-white rounded-full">
                <a href="">
                  <img
                    src="../public/github.jpg"
                    alt=""
                    className=" rounded-full"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE & NAV */}
        <div className="relative bg-white flex flex-col">
          {/* Top Nav */}
          <div className="flex justify-between items-center p-8">
            <div className="flex gap-10 text-gray-600 text-sm">
              <span className="cursor-pointer hover:text-black">Services</span>
              <span className="cursor-pointer hover:text-black">Pricing</span>
              <span className="cursor-pointer hover:text-black">Support</span>
            </div>

            <button
              className="bg-black text-white px-5 py-2 text-sm hover:cursor-pointer rounded-md"
              onClick={() => navigate("/register")}
            >
              REGISTER NOW
            </button>
          </div>

          {/* Image Section */}
          <div className="flex-1 flex items-center justify-center p-8">
            <img
              src="../public/YT_logo.avif"
              alt="3D Object"
              className="max-h-[500px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
