import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setError, setVideos } from "../features/video/video.slice";
import api from "../services/axiosInstance.js";
import VideoCard from "./VideoCard.jsx";
import SortSection from "../components/shaped/SortSection.jsx";
import { toggleonpage } from "../features/auth/auth.slice.js";
export default function Home() {
  const [startIndex, setStartIndex] = useState(0);
  const dispatch = useDispatch();
  dispatch(toggleonpage("Home"));
  const { videos, loading } = useSelector((state) => state.video);
  const [page, setPage] = useState(1);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleNext = () => {
    if (startIndex + 4 >= videos.length) {
      setPage((p) => p + 1);
    }

    setStartIndex((prev) => prev + 3);
  };

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

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-black text-white px-4">
        <div className="bg-[#1f1f1f] border border-gray-700 rounded-2xl px-10 py-8 text-center max-w-xl shadow-lg">
          <h1 className="text-2xl font-semibold mb-3">
            Try searching to get started
          </h1>
          <p className="text-gray-400 text-sm">
            Start watching videos to help us build a feed of videos you'll love.
          </p>
        </div>
      </div>
    );
  }

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
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-neutral-800 text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-neutral-700 transition-colors"
          >
            Load more
          </button>
        </div>

        {/* Loader (instead of refreshing UI) */}
        {loading && (
          <p className="text-center text-gray-400 mt-4">
            Loading more videos...
          </p>
        )}
      </div>

      {/* ── Shorts Section ── */}
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M17.77 10.32l-1.2-.5L18 9.06a3.74 3.74 0 10-3.5-6.56L6.22 6.4A3.75 3.75 0 007.5 13.5h.08l-1.06.44A3.75 3.75 0 107.9 20.5l8.28-3.9a3.75 3.75 0 001.59-5.28z"
                fill="#FF0000"
              />
              <path d="M10 14.5v-5l5 2.5-5 2.5z" fill="white" />
            </svg>

            <h2 className="text-xl font-semibold">Shorts</h2>
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setStartIndex((prev) => Math.max(prev - 3, 0))}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
            >
              ←
            </button>

            <button
              onClick={handleNext}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
            >
              →
            </button>
          </div>
        </div>

        {/* Shorts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-8">
          {videos?.slice(startIndex, startIndex + 3).map((video) => (
            <SortSection key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
