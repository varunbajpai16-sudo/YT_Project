import { useState, useRef } from "react";
import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import api from "../services/axiosInstance";
import { NavLink } from "react-router";
import registerLoading from "../../public/loding.json";
const Channel = React.memo(() => {
  const user = useSelector((state) => state.auth.user);
  const avatar = user?.avatar;
  const navigate = useNavigate();
  const [uploade, setuploade] = useState(false);
  const [apiuplode, setapiuplode] = useState(false);
  const [flag, setflag] = useState(false);
  const fullname = user?.fullname;
  const thumbnailref = useRef(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    videofile: null,
    title: "",
    description: "",
    thumbnail: null,
  });

  const HandelChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setflag(true);
      setuploade(false);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("thumbnail", formData.thumbnail);
      data.append("videofile", formData.videofile);
      setapiuplode(true);
      const response = await api.post("video/uploadvideo", data);
      setapiuplode(false);
      toast.success(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Upload failed");
      }
    }
  };

  return (
    <div className="flex bg-[#0f0f0f] text-white min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#181818] p-6 flex flex-col justify-between">
        <div>
          {/* Channel Info */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mb-3">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Guest"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>Guest</span>
              )}
            </div>
            <p className="text-sm text-gray-400">Your channel</p>
            <p className="text-sm font-medium">{fullname}</p>
          </div>

          {/* Menu */}
          <nav className="space-y-2 text-sm">
            <NavLink
              to="/channel"
              className={({ isActive }) =>
                `w-full block text-left px-4 py-2 rounded-lg ${
                  isActive ? "bg-black" : "hover:bg-[#2a2a2a]"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/channelcontent"
              className={({ isActive }) =>
                `w-full block text-left px-4 py-2 rounded-lg ${
                  isActive ? "bg-black" : "hover:bg-[#2a2a2a]"
                }`
              }
            >
              Content
            </NavLink>

            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#2a2a2a]">
              Analytics
            </button>

            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#2a2a2a]">
              Community
            </button>

            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#2a2a2a]">
              Subtitles
            </button>

            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#2a2a2a]">
              Content detection
            </button>

            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#2a2a2a]">
              Earn
            </button>

            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#2a2a2a]">
              Customisation
            </button>

            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#2a2a2a]">
              Audio library
            </button>
          </nav>
        </div>

        {/* Bottom Links */}
        <div className="space-y-3 text-sm text-gray-400">
          <div className="cursor-pointer hover:text-white">Settings</div>
          <div className="cursor-pointer hover:text-white">Send feedback</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-semibold mb-8">Channel dashboard</h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Upload Card */}
          <div className="border border-gray-700 rounded-xl p-10 flex flex-col items-center justify-center text-center">
            <div className="w-40 h-40 mb-6 overflow-hidden rounded-2xl">
              <img
                src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_v4_darkmode.svg"
                alt="Channel"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Want to see metrics on your recent video? Upload and publish a
              video to get started.
            </p>

            <button
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
              onClick={() => setuploade(true)}
            >
              Upload videos
            </button>
          </div>

          {/* Analytics Card */}
          <div className="border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Channel analytics</h2>

            <div className="mb-6">
              <p className="text-gray-400 text-sm">Current subscribers</p>
              <p className="text-3xl font-semibold">0</p>
            </div>

            <div className="border-t border-gray-700 pt-4 mb-6">
              <p className="text-sm font-medium mb-2">Summary</p>
              <p className="text-xs text-gray-400 mb-2">Last 28 days</p>

              <div className="flex justify-between text-sm mb-2">
                <span>Views</span>
                <span>0 —</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Watch time (hours)</span>
                <span>0.0 —</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4 mb-6">
              <p className="text-sm font-medium mb-2">Top content</p>
              <p className="text-xs text-gray-400">Last 48 hours · Views</p>
            </div>

            <button className="bg-[#2a2a2a] px-4 py-2 rounded-full text-sm hover:bg-[#3a3a3a] transition">
              Go to channel analytics
            </button>
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {uploade && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="w-[900px] h-[520px] bg-[#212121] rounded-2xl text-white flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold">Upload videos</h2>

              <button
                onClick={() => setuploade(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* Upload Area */}
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <div className="w-28 h-28 rounded-full bg-[#181818] flex items-center justify-center mb-6">
                ⬆️
              </div>

              <p className="text-lg mb-2">
                Drag and drop video files to upload
              </p>

              <p className="text-gray-400 text-sm mb-6">
                Your videos will be private until you publish them.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                name="videofile"
                onChange={HandelChange}
                accept="video/*"
                className="hidden"
              />
              <button
                className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200"
                onClick={() => fileInputRef.current.click()}
              >
                Select files
              </button>
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-400 text-center px-12 pb-6">
              By submitting your videos to YouTube, you acknowledge that you
              agree to YouTube's Terms of Service and Community Guidelines.
            </div>
          </div>
        </div>
      )}
      {flag && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6">
          <div className="w-full max-w-5xl bg-zinc-900 text-white rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">xeooh3wuervwjpvng2fj</h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setflag(false)}
              >
                ✕
              </button>
            </div>

            {/* Steps */}
            <div className="flex items-center gap-6 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2 hover:bg-white p-3 rounded-md hover:text-black hover:cursor-pointer">
                <div className="w-6 h-6 rounded-full border flex items-center justify-center bg-white">
                  1
                </div>
                Details
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-3 gap-6">
              {/* Left */}
              <div className="col-span-2 space-y-6">
                <div>
                  <label className="text-sm text-gray-300">
                    Title (required)
                  </label>
                  <input
                    className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 outline-none"
                    placeholder="Add a title"
                    onChange={HandelChange}
                    name="title"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">Description</label>
                  <textarea
                    rows="5"
                    name="description"
                    className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 outline-none"
                    placeholder="Tell viewers about your video"
                    onChange={HandelChange}
                  />
                </div>

                {/* Thumbnail */}
                <div>
                  <p className="text-sm text-gray-300 mb-3">Thumbnail</p>

                  <div className="flex justify-center ">
                    <div className="border border-dashed border-zinc-700 rounded-lg p-6 flex items-center justify-center text-gray-400 hover:text-gray-200 hover:cursor-pointer">
                      <input
                        type="file"
                        ref={thumbnailref}
                        name="thumbnail"
                        onChange={HandelChange}
                        accept="image/*"
                        className="hidden"
                      ></input>
                      <button onClick={() => thumbnailref.current.click()}>
                        {formData.thumbnail
                          ? formData.thumbnail.name
                          : "Upload File"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Audience */}
                <div>
                  <p className="text-sm text-gray-300 mb-2">Audience</p>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" /> Yes, it's Made for Kids
                    </label>

                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" /> No, it's not Made for Kids
                    </label>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
                <video
                  className="w-full h-40 bg-black rounded-md"
                  src={
                    formData.videofile
                      ? URL.createObjectURL(formData.videofile)
                      : ""
                  }
                  controls
                />

                <div className="text-sm">
                  <p className="text-gray-400">Video link</p>
                  <p className="text-blue-400">
                    {formData.videofile
                      ? URL.createObjectURL(formData.videofile)
                      : ""}
                  </p>
                </div>

                <div className="text-sm">
                  <p className="text-gray-400">{formData.videofile?.name}</p>
                  <p>video.webm</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-8">
              <button
                className="bg-white text-black px-6 py-2 rounded-full font-medium"
                onClick={handleSubmit}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {apiuplode && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
          <Lottie
            animationData={registerLoading}
            loop={true}
            className="w-72"
          />
          <p className="text-white text-lg font-semibold mt-4">Uploading...</p>
        </div>
      )}
    </div>
  );
});

export default Channel;
