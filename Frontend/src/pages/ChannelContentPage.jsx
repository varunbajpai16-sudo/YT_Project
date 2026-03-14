import { useEffect, useState } from "react";
import api from "../services/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function ChannelContent() {
  const [videos, setvideos] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const avatar = user?.avatar;
  const navigate = useNavigate();

  const featchuservideos = async () => {
    try {
      const res = await api.get("video/getuservideos");
      setvideos(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    featchuservideos();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0f0f0f] text-gray-200 pb-16 md:pb-0">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#181818] p-6 flex-col justify-between">
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
            <p className="text-sm font-medium">{user?.fullname}</p>
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
          </nav>
        </div>

        <div className="space-y-3 text-sm text-gray-400">
          <div className="cursor-pointer hover:text-white">Settings</div>
          <div className="cursor-pointer hover:text-white">Send feedback</div>
        </div>
      </aside>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-gray-700 flex justify-around items-center py-2 z-50">
        <NavLink to="/channel" className="flex flex-col items-center text-xs">
          🏠
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/channelcontent"
          className="flex flex-col items-center text-xs"
        >
          🎬
          <span>Content</span>
        </NavLink>

        <button className="flex flex-col items-center text-xs">
          📊
          <span>Analytics</span>
        </button>

        <button className="flex flex-col items-center text-xs">
          ⚙️
          <span>Settings</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-x-auto">
        {/* Header */}
        <h1 className="text-xl font-semibold mb-6">Channel content</h1>

        {/* Tabs */}
        <div className="flex gap-6 text-sm border-b border-gray-700 pb-3 mb-6">
          <span className="border-b-2 border-white pb-3">Videos</span>
        </div>

        {/* Table Header */}
        <div className="min-w-[900px] grid grid-cols-[3fr_1fr_1fr_1.5fr_1fr_1fr_1fr] text-xs text-gray-400 border-b border-gray-700 py-3 gap-4">
          <span>Video</span>
          <span>Visibility</span>
          <span>Restrictions</span>
          <span>Date ↓</span>
          <span>Views</span>
          <span>Comments</span>
          <span>Likes</span>
        </div>

        {/* Video List */}
        {videos.length > 0 &&
          videos.map((video) => {
            const thumbnailUrl = video.videofile
              .replace("/upload/", "/upload/so_0,w_400,h_250,c_fill/")
              .replace(".mp4", ".jpg")
              .replace("http://", "https://");

            return (
              <div
                key={video._id}
                className="min-w-[900px] grid grid-cols-[3fr_1fr_1fr_1.5fr_1fr_1fr_1fr] items-center py-3 border-b border-gray-800 text-sm gap-4 hover:bg-gray-950"
              >
                {/* Video Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-44 h-24 bg-black rounded overflow-hidden">
                    <img
                      src={video.thumbnail || thumbnailUrl}
                      className="w-full h-full object-cover"
                    />

                    <span className="absolute bottom-1 right-1 text-xs bg-black px-1 rounded">
                      {video.duration || "0:14"}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-white">{video.title}</p>

                    <div className="flex gap-3 text-gray-400 mt-1 text-xs">
                      <span
                        className="cursor-pointer hover:text-white"
                        onClick={() => navigate("/watch", { state: { video } })}
                      >
                        ▶
                      </span>

                      <span className="cursor-pointer hover:text-white">
                        🗑️
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  🌍 <span>Public</span>
                </div>

                <span>Made for Kids</span>

                <div>
                  <p>{new Date(video.createdAt).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">Published</p>
                </div>

                <span>{video.views || 0}</span>

                <span>{video.commentsCount || 0}</span>

                <span>-</span>
              </div>
            );
          })}

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <div className="w-32 h-32 bg-teal-500 rounded-xl mb-6"></div>

            <p className="text-gray-400 mb-4">No content available</p>
          </div>
        )}
      </main>
    </div>
  );
}
