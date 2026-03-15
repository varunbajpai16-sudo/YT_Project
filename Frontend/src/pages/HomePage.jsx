import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setError, setVideos } from "../features/video/video.slice";
import api from "../services/axiosInstance.js";
import VideoCard from "./VideoCard.jsx";
import SortSection from "../components/shaped/SortSection.jsx";
import { toggleonpage } from "../features/auth/auth.slice.js";
import registerLoading from "../../public/loding.json";
import Lottie from "lottie-react";
export default function Home() {
  const dispatch = useDispatch();
  dispatch(toggleonpage("Home"));
  const { videos, loading } = useSelector((state) => state.video);
  const [page, setPage] = useState(1);

  const fetchVideos = async (page = 1) => {
    try {
      dispatch(setLoading(true));

      const res = await api.get(`video/getallvideos?page=${page}&limit=12`);

      dispatch(setVideos({ videos: res.data.data, page }));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen">
      {/* ── Video Grid ── */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {videos?.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>

        {/* Load More Button */}
        {!loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="bg-neutral-800 text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-neutral-700 transition-colors"
            >
              Load more
            </button>
          </div>
        )}

        {/* Loader (instead of refreshing UI) */}
        {loading &&  (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
            <div className="bg-[#181818] rounded-2xl p-8 flex flex-col items-center gap-6 max-w-md text-center shadow-xl">
              <Lottie
                animationData={registerLoading}
                loop={true}
                className="w-48"
              />

              <h2 className="text-xl font-semibold text-white">
                Waking up the server
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed">
                Our backend is on a free hosting plan and goes to sleep when
                inactive. It usually takes{" "}
                <span className="text-white font-medium">20-40 seconds</span> to
                start.
              </p>

              {/* Animated dots */}
              <div className="flex gap-2 mt-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>

              <p className="text-xs text-gray-500">
                Thanks for your patience 🙏
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Shorts Section ── */}
      
    </div>
  );
}
