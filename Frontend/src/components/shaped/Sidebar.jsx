import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ mobile }) => {
  const onpage = useSelector((state) => state.auth.onpage);
  const togglesidebar = useSelector((state) => state.toggle.showSidebar);

  const navigate = useNavigate();

  /* ---------------- MOBILE SIDEBAR ---------------- */

  if (mobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-[60px] bg-black border-t border-gray-800 flex justify-around items-center text-white md:hidden">

        <div
          className={`flex flex-col items-center text-sm cursor-pointer ${
            onpage === "Home" ? "text-red-500" : ""
          }`}
          onClick={() => navigate("/")}
        >
          <span>🏠</span>
          <span className="text-xs">Home</span>
        </div>

        <div
          className={`flex flex-col items-center text-sm cursor-pointer ${
            onpage === "Shorts" ? "text-red-500" : ""
          }`}
          onClick={() => navigate("/sorts")}
        >
          <span>🎬</span>
          <span className="text-xs">Shorts</span>
        </div>

        <div
          className="flex flex-col items-center text-sm cursor-pointer"
          onClick={() => navigate("/ChannelContent")}
        >
          <span>📺</span>
          <span className="text-xs">Channel</span>
        </div>

        <div
          className="flex flex-col items-center text-sm cursor-pointer"
          onClick={() => navigate("/channel")}
        >
          <span>👤</span>
          <span className="text-xs">You</span>
        </div>

      </div>
    );
  }

  /* ---------------- DESKTOP SIDEBAR ---------------- */

  return (
    <div
      className={`hidden md:block h-full bg-black text-white border-r border-gray-800 overflow-y-auto transition-all duration-300
      ${togglesidebar ? "w-[240px] p-5" : "w-[80px] p-3"}`}
    >
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

          <div className="mb-6">
            <h2 className="text-white font-semibold mb-4">
              More from YouTube
            </h2>

            <div className="space-y-1">
              <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
                ▶️
                <a href="https://www.youtube.com/premium">
                  YouTube Premium
                </a>
              </div>

              <div
                className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer"
                onClick={() => navigate("/channel")}
              >
                ⬢
                <span>YouTube Studio</span>
              </div>

              <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
                🎵
                <a href="https://music.youtube.com/">
                  YouTube Music
                </a>
              </div>
            </div>
          </div>

          <hr className="border-gray-800 my-4" />

          <div className="space-y-1">
            <div
              className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer"
              onClick={() => navigate("/setting")}
            >
              ⚙️
              <span>Settings</span>
            </div>

            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              🚩
              <a href="https://www.youtube.com/t/contact_us">
                Report history
              </a>
            </div>

            <div className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer">
              ❓
              <a href="https://support.google.com/youtube/">Help</a>
            </div>

            <div
              className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-900 cursor-pointer"
              onClick={() => navigate("/feedback")}
            >
              💬
              <span>Send feedback</span>
            </div>
          </div>

          <hr className="border-gray-800 my-4" />

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