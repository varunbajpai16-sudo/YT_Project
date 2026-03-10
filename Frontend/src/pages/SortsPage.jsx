import { useLocation } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import { toggleonpage } from "../features/auth/auth.slice";
export default function ShortsPage() {
  const videos = useSelector((state) => state.video.videos);
  const onpage = useSelector((state)=>state.auth.onpage)
  const dispatch = useDispatch()
  dispatch(toggleonpage("Sorts"))
  const location = useLocation();
  const selectedVideo = location.state?.video;

  const shortsVideos = selectedVideo ? [selectedVideo, ...videos] : videos;

  return (
    <div className="bg-black min-h-screen flex justify-center">
      
      {/* Phone Frame */}
      <div className="w-[390px] h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">

        {shortsVideos.map((video) => {
          const videoUrl = video.videofile
            .replace("/upload/", "/upload/q_auto,f_auto,w_1280/vc_auto/")
            .replace("http://", "https://");

          return (
            <div
              key={video._id}
              className="relative w-full h-screen snap-start bg-gray-800"
            >
              {/* Video */}
              <video
                src={videoUrl}
                autoPlay
                controls
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />

              {/* Right Action Bar */}
              <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 text-white">

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

                <div className="flex flex-col items-center">
                  <span className="text-3xl">❤️</span>
                  <span className="text-sm font-medium">24.5K</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-3xl">💬</span>
                  <span className="text-sm font-medium">1.2K</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-3xl">↗</span>
                  <span className="text-sm font-medium">Share</span>
                </div>

                <div className="text-3xl">⋮</div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 w-full px-4 pb-6 pt-16 bg-gradient-to-t from-black via-black/70 to-transparent text-white">
                
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-sm">
                    @{video.owner?.username}
                  </span>

                  <button className="bg-white text-black text-xs px-4 py-1 rounded-full font-semibold">
                    Subscribe
                  </button>
                </div>

                <p className="text-sm leading-snug">
                  {video.description}
                </p>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}