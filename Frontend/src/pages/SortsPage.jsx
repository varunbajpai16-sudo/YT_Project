import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toggleonpage } from "../features/auth/auth.slice";

export default function ShortsPage() {
  const videos = useSelector((state) => state.video.videos);
  const dispatch = useDispatch();
  dispatch(toggleonpage("Shorts"));

  const location = useLocation();
  const selectedVideo = location.state?.video;

  const shortsVideos = selectedVideo ? [selectedVideo, ...videos] : videos;

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">

      {/* PHONE FRAME */}
      <div className="w-[390px] h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">

        {shortsVideos.map((video) => {
          const videoUrl = video.videofile
            .replace("/upload/", "/upload/q_auto,f_auto,w_1280/vc_auto/")
            .replace("http://", "https://");

          return (
            <div
              key={video._id}
              className="relative w-full h-[90vh] snap-start bg-black rounded-xl overflow-hidden"
            >

              {/* VIDEO */}
              <video
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* RIGHT ACTION BAR */}
              <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 text-white">

                {/* Profile */}
                <div className="relative">
                  <img
                    src={video.owner?.avatar}
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
                  <span className="text-xs">24.5K</span>
                </div>

                {/* Dislike */}
                <div className="flex flex-col items-center">
                  <span className="text-3xl">👎</span>
                  <span className="text-xs">Dislike</span>
                </div>

                {/* Comments */}
                <div className="flex flex-col items-center">
                  <span className="text-3xl">💬</span>
                  <span className="text-xs">1.2K</span>
                </div>

                {/* Share */}
                <div className="flex flex-col items-center">
                  <span className="text-3xl">↗</span>
                  <span className="text-xs">Share</span>
                </div>

                {/* Remix */}
                <div className="flex flex-col items-center">
                  <span className="text-3xl">🎵</span>
                  <span className="text-xs">Remix</span>
                </div>

                {/* More */}
                <div className="text-3xl">⋮</div>
              </div>

              {/* BOTTOM INFO */}
              <div className="absolute bottom-0 w-full px-4 pb-6 pt-20 bg-gradient-to-t from-black via-black/70 to-transparent text-white">

                {/* USER + SUBSCRIBE */}
                <div className="flex items-center gap-3 mb-2">

                  <span className="font-semibold text-sm">
                    @{video.owner?.username}
                  </span>

                  <button className="bg-white text-black text-xs px-4 py-1 rounded-full font-semibold hover:bg-gray-200">
                    Subscribe
                  </button>

                </div>

                {/* DESCRIPTION */}
                <p className="text-sm leading-snug mb-3">
                  {video.description}
                </p>

                {/* MUSIC BAR */}
                <div className="flex items-center gap-2 text-sm opacity-90">

                  <span className="text-lg">🎵</span>

                  <span className="truncate">
                    Original Sound - @{video.owner?.username}
                  </span>

                  {/* Rotating disc */}
                  <div className="ml-auto w-8 h-8 rounded-full overflow-hidden border border-white animate-spin">
                    <img
                      src={video.owner?.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}