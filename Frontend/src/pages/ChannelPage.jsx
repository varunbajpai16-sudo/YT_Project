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

      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Upload failed");
      }
    } finally {
      setapiuplode(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#0f0f0f] text-white min-h-screen pb-16 md:pb-0">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#181818] p-6 flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover"/>
              ) : (
                <span>Guest</span>
              )}
            </div>

            <p className="text-sm text-gray-400">Your channel</p>
            <p className="text-sm font-medium">{fullname}</p>
          </div>

          <nav className="space-y-2 text-sm">

            <NavLink
              to="/channel"
              className={({isActive}) =>
                `block px-4 py-2 rounded-lg ${
                  isActive ? "bg-black" : "hover:bg-[#2a2a2a]"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/channelcontent"
              className={({isActive}) =>
                `block px-4 py-2 rounded-lg ${
                  isActive ? "bg-black" : "hover:bg-[#2a2a2a]"
                }`
              }
            >
              Content
            </NavLink>

          </nav>
        </div>

        <div className="space-y-3 text-sm text-gray-400">
          <div className="cursor-pointer hover:text-white">Settings</div>
          <div className="cursor-pointer hover:text-white">Send feedback</div>
        </div>
      </aside>


      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-gray-700 flex justify-around py-2 z-50">

        <NavLink
          to="/channel"
          className={({isActive}) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-white" : "text-gray-400"
            }`
          }
        >
          🏠
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/channelcontent"
          className={({isActive}) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-white" : "text-gray-400"
            }`
          }
        >
          🎬
          <span>Content</span>
        </NavLink>

        <button className="flex flex-col items-center text-xs text-gray-400">
          📊
          <span>Analytics</span>
        </button>

        <button className="flex flex-col items-center text-xs text-gray-400">
          ⚙️
          <span>Settings</span>
        </button>

      </div>


      {/* Main */}
      <main className="flex-1 p-4 md:p-10">

        <h1 className="text-2xl font-semibold mb-8">
          Channel dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

          {/* Upload Card */}
          <div className="border border-gray-700 rounded-xl p-6 md:p-10 flex flex-col items-center text-center">

            <div className="w-40 h-40 mb-6 overflow-hidden rounded-2xl">
              <img
                src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_v4_darkmode.svg"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Want to see metrics on your recent video? Upload and publish a
              video to get started.
            </p>

            <button
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200"
              onClick={() => setuploade(true)}
            >
              Upload videos
            </button>

          </div>

        </div>
      </main>


      {/* Upload Modal */}
      {uploade && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

          <div className="w-full md:w-[800px] max-h-[90vh] bg-[#212121] rounded-2xl flex flex-col overflow-y-auto">

            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold">Upload videos</h2>

              <button
                onClick={() => setuploade(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 text-center p-6">

              <div className="w-28 h-28 rounded-full bg-[#181818] flex items-center justify-center mb-6">
                ⬆️
              </div>

              <p className="text-lg mb-4">
                Drag and drop video files to upload
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
                className="bg-white text-black px-5 py-2 rounded-full text-sm"
                onClick={() => fileInputRef.current.click()}
              >
                Select files
              </button>

            </div>

          </div>

        </div>
      )}



      {/* VIDEO DETAILS MODAL */}
      {flag && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">

          <div className="w-full max-w-5xl bg-zinc-900 rounded-xl p-4 md:p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between mb-6">
              <h2 className="text-lg font-semibold">Video Details</h2>

              <button
                onClick={() => setflag(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

              <div className="md:col-span-2 space-y-6">

                <input
                  name="title"
                  placeholder="Title"
                  onChange={HandelChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
                />

                <textarea
                  name="description"
                  rows="5"
                  placeholder="Description"
                  onChange={HandelChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
                />

                <button
                  onClick={() => thumbnailref.current.click()}
                  className="border border-dashed border-zinc-700 px-6 py-4 rounded-lg w-full"
                >
                  Upload Thumbnail
                </button>

                <input
                  ref={thumbnailref}
                  type="file"
                  name="thumbnail"
                  onChange={HandelChange}
                  accept="image/*"
                  className="hidden"
                />

              </div>


              <div className="bg-zinc-800 p-4 rounded-lg">

                <video
                  src={
                    formData.videofile
                      ? URL.createObjectURL(formData.videofile)
                      : ""
                  }
                  className="w-full rounded-lg max-h-64 object-cover"
                  controls
                />

                <p className="text-sm mt-3 text-gray-400">
                  {formData.videofile?.name}
                </p>

              </div>

            </div>


            <div className="flex justify-end mt-6">

              <button
                onClick={handleSubmit}
                className="bg-white text-black px-6 py-2 rounded-full"
              >
                Upload
              </button>

            </div>

          </div>

        </div>

      )}



      {/* Upload Loader */}
      {apiuplode && (

        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">

          <Lottie
            animationData={registerLoading}
            loop
            className="w-40 md:w-72"
          />

          <p className="text-white text-lg font-semibold mt-4">
            Uploading...
          </p>

        </div>

      )}

      <Toaster/>

    </div>
  );
});

export default Channel;