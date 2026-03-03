import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setError, setVideos } from "../features/video/video.slice";
import api from "../services/axiosInstance.js";
import VideoCard from "./VideoCard.jsx";
export default function Home() {
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.video);
  const [page,setpage] = useState(1)
  const fetchVideos = async (page = 1) => {
    try {
      dispatch(setLoading(true));
      const res = await api.get(`video/getallvideos?page=${page}&limit=10`);
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

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Featured Videos Section */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {videos?.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>

      {/* Shorts Section */}
      <div className="px-4 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-red-600 text-xl">🎬</span>
          <h2 className="text-xl font-bold">Shorts</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Short Card 1 */}
          {videos?.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
        <button
          onClick={() => {
            const nextPage = page + 1;
            setpage(nextPage);
          }}
          className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          Load More
        </button>
      </div>
    </div>
  );
}
