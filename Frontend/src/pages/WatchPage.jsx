export default function WatchPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      
      {/* Main Layout */}
      <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col lg:flex-row gap-8">

        {/* LEFT SECTION */}
        <div className="flex-1">

          {/* Video Player */}
          <div className="w-full aspect-video bg-zinc-900 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1587614382346-ac1ce2b5f3d3"
              alt="video"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold mt-4">
            India vs West Indies 2019 - 3RD ODI | Dramatic Full Match Highlights
          </h1>

          {/* Channel + Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-4">

            {/* Channel Info */}
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                className="w-10 h-10 rounded-full"
                alt="channel"
              />
              <div>
                <p className="font-medium">Life in Bollywood</p>
                <p className="text-sm text-gray-400">9.03K subscribers</p>
              </div>

              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold ml-4 hover:bg-gray-200">
                Subscribe
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button className="bg-zinc-800 px-4 py-2 rounded-full text-sm hover:bg-zinc-700">
                👍 1.5K
              </button>
              <button className="bg-zinc-800 px-4 py-2 rounded-full text-sm hover:bg-zinc-700">
                Share
              </button>
              <button className="bg-zinc-800 px-4 py-2 rounded-full text-sm hover:bg-zinc-700">
                Save
              </button>
              <button className="bg-zinc-800 px-4 py-2 rounded-full text-sm hover:bg-zinc-700">
                ...
              </button>
            </div>

          </div>

          {/* Description */}
          <div className="bg-zinc-900 rounded-xl p-4 mt-4 text-sm">
            <p className="text-gray-300">
              126K views • 9 months ago
            </p>

            <p className="mt-2 text-gray-400">
              India vs West Indies 2019 - 3RD ODI | Dramatic Full Match Highlights
              <br />
              #indvswi #cricket #highlights
            </p>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="font-semibold mb-4">7 Comments</h2>

            {/* Add Comment */}
            <div className="flex items-start gap-3 mb-6">
              <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center">
                V
              </div>
              <input
                type="text"
                placeholder="Add a comment..."
                className="bg-transparent border-b border-gray-600 flex-1 outline-none pb-2"
              />
            </div>

            {/* Comment Item */}
            {[1,2,3].map((item) => (
              <div key={item} className="flex gap-3 mb-6">
                <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">User Name</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Amazing match 🔥 Kohli was on another level!
                  </p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-400">
                    <span>👍 24</span>
                    <span>Reply</span>
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-[400px] space-y-4">

          {[1,2,3,4,5].map((item) => (
            <div key={item} className="flex gap-3 cursor-pointer group">
              
              <div className="relative min-w-[168px] h-[94px] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded">
                  15:01
                </span>
              </div>

              <div className="flex flex-col">
                <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-gray-300">
                  India vs New Zealand 2023-24 - 3RD ODI | Dramatic Full Match
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Life in Bollywood
                </p>
                <p className="text-xs text-gray-400">
                  269K views • 9 months ago
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}