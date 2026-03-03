import React from "react";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const Navigate = useNavigate()
  return (
    <div className="w-full h-full bg-black text-white border-r border-gray-800 p-5 overflow-y-auto">
      {/* Main Menu */}
      <div className="space-y-2">
        {/* Home */}
        <div className="flex items-center gap-4 bg-gray-800 p-2 rounded-lg cursor-pointer">
          <span>🏠</span>
          <span>Home</span>
        </div>

        {/* Shorts */}
        <div className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer" onClick={()=>Navigate("/sorts")}>
          <span>🎬</span>
          <span>Shorts</span>
        </div>
      </div>

      <hr className="border-gray-800 my-4" />

      {/* Subscriptions */}
      <div>
        <div className="flex items-center justify-between text-white text-[1.1rem] font-semibold mb-3 relative hover:bg-gray-800 rounded-2xl p-3">
          <span>Subscriptions</span>
          <span className=" absolute left-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </span>
        </div>

        <div className="space-y-3"></div>

        <div className="mt-3 text-gray-400 text-sm cursor-pointer hover:text-white">
          <span className="flex gap-1.5 hover:bg-gray-800 p-3 rounded-2xl hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <span> Show more </span>
          </span>
        </div>
      </div>

      <hr className="border-gray-800 my-4" />

      {/* You Section */}
      <div>
        <div className="flex items-center justify-between text-gray-400 text-sm font-semibold mb-3">
          <span>You</span>
          <span>{">"}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
            <span>🕒</span>
            <span>History</span>
          </div>

          <div className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
            <span>📂</span>
            <span>Playlists</span>
          </div>

          <div className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
            <span>⏰</span>
            <span>Watch Later</span>
          </div>

          <div className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
            <span>👍</span>
            <span>Liked videos</span>
          </div>

          <div className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
            <span>📹</span>
            <span>Your videos</span>
          </div>

          <div className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
            <span>⬇</span>
            <span>Downloads</span>
          </div>
        </div>

        <div className="mt-3 text-gray-400 text-sm cursor-pointer hover:text-white">
          <span className="flex gap-1.5 hover:bg-gray-800 p-3 rounded-2xl hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <span> Show more </span>
          </span>
        </div>

        <hr className="border-gray-800 my-4" />

        {/* Explore */}
        <div className="mb-6">
          <h2 className="text-white font-semibold mb-4">Explore</h2>

          <div className="space-y-1">
            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              <span>🛍️</span>
              <span>Shopping</span>
            </div>

            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              <span>🎵</span>
              <span>Music</span>
            </div>

            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              <span>🎬</span>
              <span>Films</span>
            </div>

            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              <span>⌄</span>
              <span>Show more</span>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-4" />

        {/* More from YouTube */}
        <div className="mb-6">
          <h2 className="text-white font-semibold mb-4">More from YouTube</h2>

          <div className="space-y-1">
            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              <span>▶️</span>
              <span>YouTube Premium</span>
            </div>

            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              <span>⬢</span>
              <span>YouTube Studio</span>
            </div>

            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              <span>🎵</span>
              <span>YouTube Music</span>
            </div>

            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              <span>👶</span>
              <span>YouTube Kids</span>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-4" />

        {/* Settings */}
        <div className="space-y-1">
          <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
            <span>⚙️</span>
            <span>Settings</span>
          </div>

          <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
            <span>🚩</span>
            <span>Report history</span>
          </div>

          <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
            <span>❓</span>
            <span>Help</span>
          </div>

          <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
            <span>💬</span>
            <span>Send feedback</span>
          </div>
        </div>

        <hr className="border-gray-800 my-4" />

        {/* Footer */}
        <div className="text-xs text-gray-500 space-y-3">
          <div className="flex flex-wrap gap-x-3">
            <span>About</span>
            <span>Press</span>
            <span>Copyright</span>
            <span>Contact us</span>
            <span>Creator</span>
            <span>Advertise</span>
            <span>Developers</span>
          </div>

          <div className="flex flex-wrap gap-x-3">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Policy & Safety</span>
            <span>How YouTube works</span>
            <span>Test new features</span>
          </div>

          <p className="pt-4 text-gray-600">© 2026 Google LLC</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
