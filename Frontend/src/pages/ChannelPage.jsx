import { useSelector } from "react-redux";
function Channel() {
  const user = useSelector((state) => state.auth.user);
  const avatar = user?.avatar;
  const fullname = user?.fullname;
  return (
    <div className="flex bg-[#0f0f0f] text-white min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#181818] p-6 flex flex-col justify-between">
        <div>
          {/* Channel Info */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mb-3">
             {avatar? (<img
                src={avatar}
                alt="Guest"
                className="w-full h-full object-cover"
              />):
              <span>Guest</span>
              }
            </div>
            <p className="text-sm text-gray-400">Your channel</p>
            <p className="text-sm font-medium">{fullname}</p>
          </div>

          {/* Menu */}
          <nav className="space-y-2 text-sm">
            {[
              "Dashboard",
              "Content",
              "Analytics",
              "Community",
              "Subtitles",
              "Content detection",
              "Earn",
              "Customisation",
              "Audio library",
            ].map((item, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-[#2a2a2a] ${
                  index === 0 ? "bg-[#2a2a2a]" : ""
                }`}
              >
                {item}
              </div>
            ))}
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
                src="/channel.jpg"
                alt="Channel"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Want to see metrics on your recent video? Upload and publish a
              video to get started.
            </p>

            <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
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
    </div>
  );
}
export default Channel;
