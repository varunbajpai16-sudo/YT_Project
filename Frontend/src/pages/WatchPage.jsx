import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SidebarVideoCard from "./SidebarVideoCard";
import api from "../services/axiosInstance";
import { setComments } from "../features/comment/commentslice";
import { useEffect } from "react";

export default function WatchPage() {
  const dispatch = useDispatch();

  const fetchcomment = async (video) => {
    try {
      const res = await api.get(`/comments/video-comments/${video._id}`);
      console.log(res.data.data)
      dispatch(setComments(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const comments = useSelector((state) => state.comments.comments);
  const videos = useSelector((state) => state.video.videos);

  const location = useLocation();
  const video = location.state?.video;

  useEffect(() => {
    if (video) {
      fetchcomment(video);
    }
  }, [video]);

  if (!video) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        Video not found
      </div>
    );
  }

  const videoUrl = video.videofile
    .replace("/upload/", "/upload/q_auto,f_auto,w_1280/vc_auto/")
    .replace("http://", "https://");

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col lg:flex-row gap-8">

        {/* LEFT SECTION */}
        <div className="flex-1">

          {/* Video Player */}
          <div className="w-full aspect-video bg-zinc-900 rounded-xl overflow-hidden">
            <video
              src={videoUrl}
              controls
              autoPlay
              preload="metadata"
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold mt-4">{video.title}</h1>

          {/* Channel */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-4">
            <div className="flex items-center gap-4">
              <img
                src={video.owner.avatar}
                className="w-10 h-10 rounded-full"
                alt="channel"
              />

              <div>
                <p className="font-medium">{video.owner.username}</p>
                <p className="text-sm text-gray-400">9.03K subscribers</p>
              </div>

              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold ml-4 hover:bg-gray-200">
                Subscribe
              </button>
            </div>

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
            </div>
          </div>

          {/* Description */}
          <div className="bg-zinc-900 rounded-xl p-4 mt-4 text-sm">
            <p className="text-gray-300">{video.views} views • 9 months ago</p>
            <p className="mt-2 text-gray-400">{video.description}</p>
          </div>

          {/* Comments */}
          <div className="mt-8">
            <h2 className="font-semibold mb-4">
              {comments?.length || 0} Comments
            </h2>

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

            {/* Comment List */}
            {comments?.map((item) => (
              <div key={item._id} className="flex gap-3 mb-6">

                <img
                  src={item.owner?.avatar}
                  className="w-9 h-9 rounded-full"
                  alt="user"
                />

                <div>
                  <p className="text-sm font-medium">
                    {item.owner?.username}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {item.content}
                  </p>

                  <div className="flex gap-4 mt-2 text-xs text-gray-400">
                    <span>👍 {item.likes || 0}</span>
                    <span>Reply</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-[400px] space-y-4">
          {videos
            ?.filter((v) => v._id !== video._id)
            .map((v) => (
              <SidebarVideoCard key={v._id} video={v} />
            ))}
        </div>

      </div>
    </div>
  );
}