import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SidebarVideoCard from "./SidebarVideoCard";
import api from "../services/axiosInstance";
import { setComments } from "../features/comment/commentslice";
import { useEffect, useState } from "react";
import { addComment } from "../features/comment/commentslice";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { toggleVideoLike } from "../features/like/Likeslice";
import { setVideoLikes } from "../features/like/Likeslice";
import { useNavigate } from "react-router-dom";
import { setVideos, setLoading } from "../features/video/video.slice";
export default function WatchPage() {
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
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const fetchcomment = async (video) => {
    try {
      const res = await api.get(`/comments/video-comments/${video._id}`);
      dispatch(setComments(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const comments = useSelector((state) => state.comments.comments);
  const videos = useSelector((state) => state.video.videos);
  useEffect(() => {
    if (videos.length === 0) {
      fetchVideos();
    }
  }, []);

  const location = useLocation();
  const video = location.state?.video;
  const AddComments = async () => {
    try {
      if (!comment.trim()) {
        return toast.error("Comment cannot be empty");
      }

      const data = {
        content: comment,
        videoId: video._id,
      };

      const res = await api.post("/comments/add-comment", data);

      dispatch(addComment(res.data.data));

      toast.success("Comment Added Successfully");

      setComment("");
    } catch (error) {
      toast.error("Failed to add comment");
      console.log(error);
    }
  };
  const featchVideoLikes = async () => {
    try {
      const res = await api.get(`/likes/video-likes/${video._id}`);
      console.log(res.data.data);
      dispatch(
        setVideoLikes({
          videoId: video._id,
          likes: res.data.data.length,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    featchVideoLikes();
  }, [video]);

  useEffect(() => {
    if (video) {
      fetchcomment(video);
    }
  }, [video]);
  const videoLikes = useSelector(
    (state) => state.likes.videoLikes[video?._id] || 0,
  );
  const likevideo = async () => {
    try {
      await api.post(`/likes/like-video/${video._id}`);

      dispatch(toggleVideoLike({ videoId: video._id }));

      toast.success("Video liked successfully");
    } catch (error) {
      console.log("ERROR STATUS:", error.response?.status);
      console.log("FULL ERROR:", error);
      if (error.response?.status === 409) {
        toast.error("Already liked the video");
      } else if (error.response?.status === 401) {
        toast.error("Please login to like this video");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    }
  };

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


  <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-6 flex flex-col lg:flex-row gap-6 lg:gap-8">

    {/* LEFT SECTION */}
    <div className="flex-1">

      {/* Video Player */}
      <div className="w-full aspect-video bg-zinc-900 rounded-lg sm:rounded-xl overflow-hidden">
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
      <h1 className="text-lg sm:text-xl font-semibold mt-4">
        {video.title}
      </h1>

      {/* Channel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">

        <div className="flex items-center gap-3 sm:gap-4">

          <img
            src={video.owner.avatar}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full"
            alt="channel"
          />

          <div>
            <p className="font-medium text-sm sm:text-base">
              {video.owner.username}
            </p>

            <p className="text-xs sm:text-sm text-gray-400">
              9.03K subscribers
            </p>
          </div>

          <button className="bg-white text-black px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold ml-2 sm:ml-4 hover:bg-gray-200">
            Subscribe
          </button>

        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">

          <button
            className="bg-zinc-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-zinc-700"
            onClick={likevideo}
          >
            👍 {videoLikes}
          </button>

          <button className="bg-zinc-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-zinc-700">
            Share
          </button>

          <button className="bg-zinc-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-zinc-700">
            Save
          </button>

        </div>
      </div>

      {/* Description */}
      <div className="bg-zinc-900 rounded-lg sm:rounded-xl p-3 sm:p-4 mt-4 text-xs sm:text-sm">

        <p className="text-gray-300">
          {video.views} views •{" "}
          {formatDistanceToNow(new Date(video.createdAt), {
            addSuffix: true,
          })}
        </p>

        <p className="mt-2 text-gray-400">
          {video.description}
        </p>

      </div>

      {/* Comments */}
      <div className="mt-8">

        <h2 className="font-semibold mb-4 text-sm sm:text-base">
          {comments?.length || 0} Comments
        </h2>

        {/* Add Comment */}
        <div className="flex gap-3 mb-6">

          <img
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full"
            src={video.owner.avatar}
          />

          <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-3">

            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="bg-transparent border-b border-gray-600 flex-1 outline-none pb-2 text-sm"
            />

            <button
              className="bg-gray-700 px-4 py-2 rounded-xl text-sm hover:bg-gray-900"
              onClick={AddComments}
            >
              Add
            </button>

          </div>

        </div>

        {/* Comment List */}
        {comments?.map((item) => (

          <div key={item._id} className="flex gap-3 mb-6">

            <img
              src={item.owner?.avatar}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full"
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
    <div className="w-full lg:w-[380px] space-y-4">

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
