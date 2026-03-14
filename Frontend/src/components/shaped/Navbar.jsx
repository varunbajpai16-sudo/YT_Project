
import { useState, useRef, useEffect } from "react";
import ProfileDropdown from "../../components/ui/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toggleSidebar } from "../../features/toggle/toggleslice";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const videos = useSelector((state) => state.video.videos);

  const [query, setQuery] = useState("");
  const [searchbar, setsearchbar] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const dropdownRef = useRef(null);
  const avatar = user?.avatar;

  const toggle = () => {
    dispatch(toggleSidebar());
  };

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
    video?.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <nav className="bg-black text-white px-4 md:px-6 py-3 md:py-4">
        <div className="w-full flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3" onClick={toggle}>
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

            <div
              className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center hover:cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
            </div>

            <span className="text-lg font-semibold hidden sm:block">
              YouTube <span className="text-xs align-top">IN</span>
            </span>
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden sm:flex flex-1 justify-center px-4">
            <div className="w-full max-w-[650px] relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClick={() => setsearchbar(true)}
                placeholder="Search"
                className="w-full bg-gray-900 text-white rounded-full py-2 px-5 focus:outline-none"
              />

              {/* Search results */}
              {query && searchbar && (
                <div className="absolute top-full left-0 w-full bg-[#212121] border border-gray-700 rounded-xl mt-2 shadow-lg z-50">
                  {filtered?.slice(0, 6).map((video) => {
                    const thumbnailUrl = video.videofile
                      .replace("/upload/", "/upload/so_0,w_400,h_250,c_fill/")
                      .replace(".mp4", ".jpg")
                      .replace("http://", "https://");

                    return (
                      <div
                        key={video._id}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-[#303030] cursor-pointer"
                        onClick={() => {
                          setQuery(video.title);
                          setsearchbar(false);
                          navigate("/watch", { state: { video } });
                        }}
                      >
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-14 h-10 object-cover rounded"
                        />

                        <div className="flex flex-col">
                          <span className="text-sm line-clamp-1">
                            {video.title}
                          </span>

                          <span className="text-xs text-gray-400">
                            {video.owner?.username}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5 relative" ref={dropdownRef}>

            {/* MOBILE SEARCH ICON */}
            <button
              className="sm:hidden"
              onClick={() => setMobileSearch(true)}
            >
              🔍
            </button>

            {/* NOTIFICATION */}
            <button className="relative">
              🔔
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                4
              </span>
            </button>

            {/* CREATE */}
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="hidden sm:flex items-center gap-2 bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-full"
            >
              ➕
              <span>Create</span>
            </button>

            {showCreateMenu && (
              <div className="absolute right-16 top-12 w-56 bg-[#282828] rounded-lg shadow-lg p-2">
                <button
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-[#3a3a3a]"
                  onClick={() => navigate("/channel")}
                >
                  📹 Upload video
                </button>
              </div>
            )}

            {/* AVATAR */}
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
            >
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center text-xs">
                  Guest
                </div>
              )}
            </div>

            {showDropdown && (
              <div className="absolute right-0 top-12 z-50">
                <ProfileDropdown />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN SEARCH */}
      {mobileSearch && (
        <div className="fixed inset-0 bg-black z-[100] p-4 sm:hidden">

          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setMobileSearch(false)}>←</button>

            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search YouTube"
              className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-full outline-none"
            />
          </div>

          <div className="space-y-3 overflow-y-auto">
            {filtered?.slice(0, 8).map((video) => {
              const thumbnailUrl = video.videofile
                .replace("/upload/", "/upload/so_0,w_400,h_250,c_fill/")
                .replace(".mp4", ".jpg")
                .replace("http://", "https://");

              return (
                <div
                  key={video._id}
                  className="flex gap-3 p-2 hover:bg-[#303030] rounded-lg cursor-pointer"
                  onClick={() => {
                    setMobileSearch(false);
                    navigate("/watch", { state: { video } });
                  }}
                >
                  <img
                    src={thumbnailUrl}
                    className="w-24 h-14 object-cover rounded"
                  />

                  <div className="flex flex-col">
                    <span className="text-sm line-clamp-2">
                      {video.title}
                    </span>

                    <span className="text-xs text-gray-400">
                      {video.owner?.username}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

