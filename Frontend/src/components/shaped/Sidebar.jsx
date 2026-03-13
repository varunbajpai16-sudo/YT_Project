import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const onpage = useSelector((state) => state.auth.onpage);
  const togglesidebar = useSelector((state) => state.toggle.showSidebar);

  const navigate = useNavigate();

  return (
    <div
      className={`h-full bg-black text-white border-r border-gray-800 overflow-y-auto transition-all duration-300
      ${togglesidebar ? "w-[240px] p-5" : "w-[80px] p-3"}`}
    >
      {/* Main Menu */}

      {/* Home */}
      <div
        className={`flex items-center ${
          togglesidebar ? "gap-4" : "justify-center"
        } ${onpage === "Home" ? "bg-gray-800" : "bg-black"} p-2 rounded-lg cursor-pointer`}
        onClick={() => navigate("/")}
      >
        <span>🏠</span>
        {togglesidebar && <span>Home</span>}
      </div>

      {/* Shorts */}
      <div
        className={`flex items-center ${
          togglesidebar ? "gap-4" : "justify-center"
        } ${onpage === "Shorts" ? "bg-gray-800" : "bg-black"} p-2 rounded-lg cursor-pointer`}
        onClick={() => navigate("/sorts")}
      >
        <span>🎬</span>
        {togglesidebar && <span>Shorts</span>}
      </div>

      {/* Collapsed extra icons */}
      {!togglesidebar && (
        <>
          <div
            className="flex justify-center p-3 cursor-pointer"
            onClick={() => navigate("/ChannelContent")}
          >
            📺
          </div>
          <div
            className="flex justify-center p-3 cursor-pointer"
            onClick={() => navigate("/channel")}
          >
            👤
          </div>
        </>
      )}

      {/* FULL SIDEBAR CONTENT */}
      {togglesidebar && (
        <>
          <hr className="border-gray-800 my-4" />

          {/* More from YouTube */}
          <div className="mb-6">
            <h2 className="text-white font-semibold mb-4">More from YouTube</h2>

            <div className="space-y-1">
              <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
                <span>▶️</span>
                <a href="https://www.youtube.com/premium">YouTube Premium</a>
              </div>

              <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
                <span>⬢</span>
                <span onClick={() => navigate("/channel")}>YouTube Studio</span>
              </div>

              <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
                <span>🎵</span>
                <a href="https://music.youtube.com/">YouTube Music</a>
              </div>
            </div>
          </div>

          <hr className="border-gray-800 my-4" />

          {/* Settings */}
          <div className="space-y-1">
            <div
              className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer"
              onClick={() => navigate("/setting")}
            >
              <span>⚙️</span>
              <span>Settings</span>
            </div>

            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              <span>🚩</span>
              <a href="https://www.youtube.com/t/contact_us">Report history</a>
            </div>

            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              <span>❓</span>
              <a href="https://support.google.com/youtube/">Help</a>
            </div>

            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              <span>💬</span>
              <span onClick={() => navigate("/feedback")}>Send feedback</span>
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
        </>
      )}
    </div>
  );
};

export default Sidebar;
