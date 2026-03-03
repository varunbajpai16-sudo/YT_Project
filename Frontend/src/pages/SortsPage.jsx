export default function ShortsPage() {
  return (
    <div className="bg-black min-h-screen flex justify-center">
      
      {/* Phone Frame */}
      <div className="relative w-[390px] h-screen bg-gray-800 overflow-hidden">

        {/* Video */}
        <img
          src="/short.jpg"
          alt="Short Video"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Right Action Bar */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 text-white">
          
          {/* Profile */}
          <div className="relative">
            <img
              src="/channel.jpg"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
              +
            </div>
          </div>

          {/* Like */}
          <div className="flex flex-col items-center">
            <span className="text-3xl">❤️</span>
            <span className="text-sm font-medium">24.5K</span>
          </div>

          {/* Comment */}
          <div className="flex flex-col items-center">
            <span className="text-3xl">💬</span>
            <span className="text-sm font-medium">1.2K</span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center">
            <span className="text-3xl">↗</span>
            <span className="text-sm font-medium">Share</span>
          </div>

          {/* More */}
          <div className="text-3xl">⋮</div>
        </div>

        {/* Bottom Info Section */}
        <div className="absolute bottom-0 w-full px-4 pb-6 pt-16 bg-gradient-to-t from-black via-black/70 to-transparent text-white">
          
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold text-sm">@CodeWithVarun</span>
            <button className="bg-white text-black text-xs px-4 py-1 rounded-full font-semibold">
              Subscribe
            </button>
          </div>

          <p className="text-sm leading-snug">
            🚀 Building YouTube Clone with React, Redux & Tailwind. 
            Follow for daily frontend content!
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs opacity-80">
            <span>🎵 Original Audio</span>
            <span>•</span>
            <span>CodeWithVarun</span>
          </div>
        </div>

      </div>
    </div>
  );
}