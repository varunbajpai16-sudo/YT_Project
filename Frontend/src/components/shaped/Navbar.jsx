import { useState, useRef, useEffect } from "react";
import ProfileDropdown from "../../components/ui/Dropdown";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const videos = useSelector((state) => state.video.videos); // ✅ FIXED
  const [query, setQuery] = useState("");
  const [searchbar,setsearchbar] = useState(false)
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const dropdownRef = useRef(null);
  const avatar = user?.avatar;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setShowCreateMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const filtered = videos?.filter((video) =>
    video?.title?.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="w-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="hover:bg-gray-800 p-2 rounded-2xl cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="white"
              fill="none"
              strokeWidth="2"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </span>

          <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center">
            <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
          </div>

          <span className="text-lg font-semibold">
            YouTube <span className="text-xs align-top">IN</span>
          </span>
        </div>

        {/* SEARCH */}
        <div className="flex-1 max-w-sm mx-8 relative">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={()=>setsearchbar(true)}
              placeholder="Search"
              className="w-full bg-gray-900 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />

            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* SEARCH DROPDOWN */}
          {query && searchbar && (
            <div className="absolute top-full left-0 w-full bg-[#212121] border border-gray-700 rounded-xl mt-2 shadow-lg overflow-hidden z-50">
              {filtered?.slice(0, 6).map((video) => {
                const thumbnailUrl = video.videofile
                  .replace("/upload/", "/upload/so_0,w_400,h_250,c_fill/")
                  .replace(".mp4", ".jpg")
                  .replace("http://", "https://");

                return (
                  <div
                    key={video._id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-[#303030] cursor-pointer transition"
                    onClick={() => {
                      setQuery(video.title);
                      setsearchbar(false);
                      navigate("/watch", { state: { video } });
                    }}
                  >
                    {/* Thumbnail */}
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="w-14 h-10 object-cover rounded"
                    />

                    {/* Video Info */}
                    <div className="flex flex-col">
                      <span className="text-sm text-white line-clamp-1">
                        {video.title}
                      </span>

                      <span className="text-xs text-gray-400">
                        {video.owner?.username}
                      </span>
                    </div>
                  </div>
                );
              })}

              {filtered?.length === 0 && (
                <div className="px-4 py-2 text-gray-400 text-sm">
                  No results
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6 relative" ref={dropdownRef}>
          {/* Notification */}
          <button className="relative">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
                6.002 0 00-4-5.659V5a2 2 0 10-4 
                0v.341C7.67 6.165 6 8.388 6 
                11v3.159c0 .538-.214 1.055-.595 
                1.436L4 17h5m6 0v1a3 3 0 
                11-6 0v-1m6 0H9"
              />
            </svg>

            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              4
            </span>
          </button>

          {/* CREATE BUTTON */}
          <button
            onClick={() => setShowCreateMenu(!showCreateMenu)}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-full transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Create</span>
          </button>

          {/* CREATE MENU */}
          {showCreateMenu && (
            <div className="absolute right-20 top-12 w-56 bg-[#282828] rounded-lg shadow-lg p-2 z-50">
              <button
                className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-[#3a3a3a]"
                onClick={() => navigate("/channel")}
              >
                📹 Upload video
              </button>
            </div>
          )}

          {/* Avatar */}
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center text-xs">
                Guest
              </div>
            )}
          </div>

          {/* PROFILE DROPDOWN */}
          {showDropdown && (
            <div className="absolute right-0 top-12 z-50">
              <ProfileDropdown />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
