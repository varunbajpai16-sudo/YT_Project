import { useState, useRef, useEffect } from "react";
import ProfileDropdown from "../../components/ui/Dropdown";
import { useSelector } from "react-redux";
export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const avatar = user?.avatar;
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="w-full mx-auto flex items-center justify-between ">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <span className=" hover:bg-gray-800 p-2 rounded-2xl hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>{" "}
          </span>
          <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center">
            <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
          </div>
          <span className="text-lg font-semibold">
            YouTube <span className="text-xs align-top">IN</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-sm mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-900 text-white rounded-full py-2 px-4 pl-4 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side - Icons and Menu */}
        <div className="flex items-center gap-6" ref={dropdownRef}>
          {/* Notification Icon */}
          <button className="relative">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              4
            </span>
          </button>

          {/* Create Button */}
          <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-full transition">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Create</span>
          </button>

          {/* Profile Avatar */}
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mb-3 cursor-pointer"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-15 h-15 rounded-full bg-gray-600 flex items-center justify-center">
                <p>Guest</p>
              </div>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 top-18 z-50">
              <ProfileDropdown />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
