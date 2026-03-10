import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const VideoCard = React.memo(({ video }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const videoRef = useRef(null);
  const hoverTimer = useRef(null);
  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setIsHover(true);
    }, 500); // wait .5 sec before showing video
  };
  function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setIsHover(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const videoUrl = video.videofile
    .replace("/upload/", "/upload/q_auto,f_auto,w_1280/vc_auto/")
    .replace("http://", "https://");

  const thumbnailUrl = video.videofile
    .replace("/upload/", "/upload/so_0,w_400,h_250,c_fill/")
    .replace(".mp4", ".jpg")
    .replace("http://", "https://");

  return (
    <div className="group cursor-pointer">
      <div
        className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video mb-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate("/watch", { state: { video } })}
      >
        {isHover ? (
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <img
            loading="lazy"
            src={thumbnailUrl}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}

        {/* Hover fade overlay */}
       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

        {!isHover && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(video.duration)}
          </span>
        )}
      </div>
      <div className="flex gap-3">
        <img
          src={video.owner?.avatar}
          alt="channel"
          className="w-9 h-9 rounded-full object-cover"
        />

        <div>
          <p className="text-sm font-medium text-white line-clamp-2">
            {video.title}
          </p>
          <p className="text-xs text-gray-400">{video.owner?.username}</p>
        </div>
      </div>
    </div>
  );
});

export default VideoCard;
